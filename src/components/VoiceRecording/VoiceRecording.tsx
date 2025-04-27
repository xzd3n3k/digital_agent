import './VoiceRecording.scss';
import React, { useState, useRef, useEffect } from 'react';
import {DeleteIcon} from "../../icons";
import {Button} from "../index";

interface VoiceRecorderProps {
    onRecordingComplete?: (blob: Blob) => void;
}

export default function VoiceRecording({ onRecordingComplete }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = async () => {
        try {
            chunksRef.current = [];
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            dataArrayRef.current = dataArray;
            sourceRef.current = source;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);

                if (onRecordingComplete) {
                    onRecordingComplete(audioBlob);
                }
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);

            drawWaveform();
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        if (sourceRef.current && analyserRef.current) {
            sourceRef.current.disconnect(analyserRef.current);
        }

        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());

        setIsRecording(false);
        cancelAnimationFrame(animationRef.current!);
    };

    const togglePlayback = () => {
        if (audioUrl) {
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const drawWaveform = () => {
        if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;

        analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();

        const sliceWidth = width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();

        animationRef.current = requestAnimationFrame(drawWaveform);
    };

    function smazat() {
        setAudioUrl(null);
    }

    useEffect(() => {
        return () => {
            cancelAnimationFrame(animationRef.current!);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    return (
        <div className="voice-recording-container">
            <div
                className="voice-recording-button"
                onClick={audioUrl ? togglePlayback : toggleRecording}
            >
                <canvas
                    className="voice-recording-canvas"
                    ref={canvasRef}
                />
            </div>

            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    hidden
                />
            )}

            { audioUrl && (
                <Button className="delete-icon-btn" variant="ghost" size="icon" onClick={smazat}>
                    <DeleteIcon />
                </Button>
            )}
        </div>
    );
}
