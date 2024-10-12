import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import pen_icon from '../assets/pen.png'
import eraser_icon from '../assets/eraser.png'
import { useLocation } from 'react-router-dom';

import api from '../api';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  max-height: 95vh;
  max-width: 98%;
  padding: 10px;
`;

const CanvasWrapper = styled.div`
  background-size: cover;
  background-position: center;
  position: relative;
  border: 1px solid black;
  flex-grow: 1;
  display: flex;
  background-color: white;
  max-height: 80vh;
`;

const Canvas = styled.canvas`
  border: 1px solid black;
  flex-grow: 1;
`;

const Controls = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 60%;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff3d2e;
  }
`;

const Input = styled.input`
  margin: 0.5rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: larger;
  font-weight: bolder;
  width: 100%;
`;

function CanvasPage() {
    const location = useLocation();
    const initialImageUrl = location.state?.image || '';
    const [isErasing, setIsErasing] = useState(false);
    const [penColor, setPenColor] = useState('#000000');
    const [penSize, setPenSize] = useState(5);
    const [eraserSize, setEraserSize] = useState(10);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        setupCanvas();
    }, [initialImageUrl]);

    useEffect(() => {
        if (ctxRef.current) {
            if (isErasing) {
                handleEraser();
            } else {
                handlePen();
            }
        }
    }, [penColor, penSize, eraserSize]);

    function setupCanvas() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        ctxRef.current = ctx;

        if (initialImageUrl) {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Set CORS for images
            img.src = `${import.meta.env.VITE_API_URL}${initialImageUrl}`;
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    }

    function getMousePos(e) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            offsetX: (e.clientX || e.touches[0].clientX) - rect.left * scaleX,
            offsetY: (e.clientY || e.touches[0].clientY) - rect.top * scaleY,
        };
    }

    function startDrawing(e) {
        if (!ctxRef.current) return;
        const { offsetX, offsetY } = getMousePos(e);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        isDrawing.current = true;
    }

    function draw(e) {
        if (!ctxRef.current || !isDrawing.current) return;
        const { offsetX, offsetY } = getMousePos(e);
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    }

    function stopDrawing() {
        if (!ctxRef.current) return;
        ctxRef.current.closePath();
        isDrawing.current = false;
    }

    function handleEraser() {
        const drawingArea = document.querySelector('.drawing-area');
        drawingArea.style.cursor = "url('https://img.icons8.com/ios-filled/30/eraser.png')10 20,auto";
        if (ctxRef.current) {
            ctxRef.current.globalCompositeOperation = 'destination-out';
            ctxRef.current.lineWidth = eraserSize;
        }
    }

    function handlePen() {
        const drawingArea = document.querySelector('.drawing-area');
        drawingArea.style.cursor = "url('https://img.icons8.com/ios-glyphs/40/pencil--v1.png')1 40, auto";
        if (ctxRef.current) {
            ctxRef.current.globalCompositeOperation = 'source-over';
            ctxRef.current.lineWidth = penSize;
            ctxRef.current.strokeStyle = penColor;
        }
    }

    function clearCanvas() {
        if (ctxRef.current) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    // async function submitImage() {
    //     try {
    //         const canvas = canvasRef.current;

    //         if (!canvas) {
    //             console.error('Canvas reference is not defined.');
    //             return;
    //         }

    //         canvas.toBlob(async (blob) => {
    //             if (!blob) {
    //                 console.error('Failed to convert canvas to blob.');
    //                 return;
    //             }

    //             const formData = new FormData();
    //             formData.append('image', blob, 'canvas-image.png');

    //             try {
    //                 const response = await api.post('save-image/', formData);
    //                 window.alert(`Text ${response.data.Text}`);
    //             } catch (error) {
    //                 console.error('Error saving image:', error.response || error.message);
    //                 window.alert('Error saving image.');
    //             }
    //         }, 'image/png');
    //     } catch (error) {
    //         console.error('Error in submitImage function:', error);
    //     }
    // }

    async function submitImage() {
        try {
            const canvas = canvasRef.current;

            if (!canvas) {
                console.error('Canvas reference is not defined.');
                return;
            }

            const ctx = canvas.getContext('2d');


            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');


            tempCtx.fillStyle = 'white';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);


            tempCtx.drawImage(canvas, 0, 0);


            tempCanvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error('Failed to convert canvas to blob.');
                    return;
                }

                const formData = new FormData();
                formData.append('image', blob, 'canvas-image.png');

                try {
                    const response = await api.post('save-image/', formData);
                    window.alert(`Answer ${response.data.Text}`);
                } catch (error) {
                    console.error('Error saving image:', error.response || error.message);
                    window.alert('Error saving image.');
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error in submitImage function:', error);
        }
    }

    return (
        <Container>
            <Controls>
                <Label htmlFor="pen-color">Pen Color
                    <Input
                        id="pen-color"
                        type="color"
                        value={penColor}
                        onChange={(e) => setPenColor(e.target.value)}
                    />
                </Label>
                <Label>Pen Size</Label>
                <Input
                    type="range"
                    min="1"
                    max="20"
                    value={penSize}
                    style={{ width: '100px' }}
                    onChange={(e) => setPenSize(e.target.value)}
                />
                <Label>Eraser Size</Label>
                <Input
                    type="range"
                    min="1"
                    max="50"
                    value={eraserSize}
                    style={{ width: '100px' }}
                    onChange={(e) => setEraserSize(e.target.value)}
                />
                <Button
                    onClick={() => {
                        setIsErasing(!isErasing);
                        if (isErasing) {
                            handlePen();
                        } else {
                            handleEraser();
                        }
                    }}
                >
                    {isErasing ? <img src={pen_icon}></img> : <img src={eraser_icon}></img>}
                </Button>
                <Button onClick={clearCanvas}>Clear</Button>
                <Button onClick={submitImage}>Save & Evaluate</Button>
            </Controls>
            <CanvasWrapper>
                <Canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className='drawing-area'
                />
            </CanvasWrapper>
        </Container>
    );
}

export default CanvasPage;
