import './VoiceRecording.scss';
import React, { useEffect, useRef, useState } from 'react';

interface VoiceRecorderProps {
    onRecordingComplete?: (blob: Blob) => void;
}

export default function VoiceRecording({ onRecordingComplete }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const websocketRef = useRef<WebSocket | null>(null);
    const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        websocketRef.current = ws;

        ws.binaryType = 'arraybuffer';

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const arrayBuffer = event.data as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);

            setAudioUrl(url);
            setShouldAutoPlay(true);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (audioRef.current && shouldAutoPlay) {
            audioRef.current.play();
            setIsPlaying(true);
            setShouldAutoPlay(false);
        }
    }, [audioUrl, shouldAutoPlay]);

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

                if (websocketRef.current?.readyState === WebSocket.OPEN) {
                    websocketRef.current.send(audioBlob);
                }
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);

        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
    };

    return (
        <div className="voice-recording-container">
            <div
                className="voice-recording-button"
                onClick={isPlaying ? undefined : toggleRecording}
            >
            </div>

            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => {
                        setIsPlaying(false);
                    }}
                    hidden
                />
            )}
        </div>
    );
}
