'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, DocumentIcon, SaveIcon, DownloadIcon, TypeIcon, ColorSwatchIcon } from './icons';

interface CanvasEditorProps {
  imageUrl?: string;
  brandName?: string;
  brandColors?: string[];
  onSave?: (canvasData: CanvasData) => void;
  onExport?: (blob: Blob, filename: string) => void;
}

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: 'normal' | 'bold';
  textAlign: 'left' | 'center' | 'right';
  rotation: number;
}

interface CanvasData {
  imageUrl?: string;
  textLayers: TextLayer[];
  dimensions: { width: number; height: number };
}

const SOCIAL_TEMPLATES = [
  { name: 'Instagram Post', width: 1080, height: 1080, icon: '📸' },
  { name: 'Instagram Story', width: 1080, height: 1920, icon: '📱' },
  { name: 'Twitter Post', width: 1200, height: 675, icon: '🐦' },
  { name: 'LinkedIn Post', width: 1200, height: 627, icon: '💼' },
  { name: 'Facebook Post', width: 1200, height: 630, icon: '👥' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, icon: '🎥' }
];

const FONT_FAMILIES = [
  'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Lato'
];

const DEFAULT_COLORS = [
  '#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1', 
  '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
];

export default function CanvasEditor({ 
  imageUrl, 
  brandName, 
  brandColors = [], 
  onSave, 
  onExport 
}: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [showTextTools, setShowTextTools] = useState(false);
  const [newText, setNewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Canvas drawing effect
  useEffect(() => {
    drawCanvas();
  }, [imageUrl, textLayers, canvasSize]);

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background image if provided
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Calculate aspect ratio and fit image
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > canvasAspect) {
          // Image is wider than canvas
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          // Image is taller than canvas
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        // Draw text layers on top
        drawTextLayers(ctx);
      };
      img.src = imageUrl;
    } else {
      // Just draw text layers
      drawTextLayers(ctx);
    }
  };

  const drawTextLayers = (ctx: CanvasRenderingContext2D) => {
    textLayers.forEach(layer => {
      ctx.save();
      
      // Set font properties
      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = layer.color;
      ctx.textAlign = layer.textAlign;
      
      // Apply rotation if any
      if (layer.rotation !== 0) {
        ctx.translate(layer.x, layer.y);
        ctx.rotate((layer.rotation * Math.PI) / 180);
        ctx.fillText(layer.text, 0, 0);
      } else {
        ctx.fillText(layer.text, layer.x, layer.y);
      }
      
      // Draw selection border if selected
      if (selectedLayer === layer.id) {
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        const metrics = ctx.measureText(layer.text);
        const textWidth = metrics.width;
        const textHeight = layer.fontSize;
        
        ctx.strokeRect(
          layer.x - 5, 
          layer.y - textHeight, 
          textWidth + 10, 
          textHeight + 10
        );
      }
      
      ctx.restore();
    });
  };

  const addTextLayer = () => {
    if (!newText.trim()) return;

    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: newText,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      fontSize: 48,
      fontFamily: 'Inter',
      color: brandColors[0] || '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
      rotation: 0
    };

    setTextLayers(prev => [...prev, newLayer]);
    setSelectedLayer(newLayer.id);
    setNewText('');
  };

  const updateSelectedLayer = (updates: Partial<TextLayer>) => {
    if (!selectedLayer) return;

    setTextLayers(prev => prev.map(layer => 
      layer.id === selectedLayer 
        ? { ...layer, ...updates }
        : layer
    ));
  };

  const deleteSelectedLayer = () => {
    if (!selectedLayer) return;
    
    setTextLayers(prev => prev.filter(layer => layer.id !== selectedLayer));
    setSelectedLayer(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    // Check if click is on any text layer
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clickedLayer = null;
    for (const layer of textLayers) {
      ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
      const metrics = ctx.measureText(layer.text);
      const textWidth = metrics.width;
      const textHeight = layer.fontSize;

      if (
        x >= layer.x - textWidth/2 && 
        x <= layer.x + textWidth/2 &&
        y >= layer.y - textHeight && 
        y <= layer.y
      ) {
        clickedLayer = layer.id;
        break;
      }
    }

    setSelectedLayer(clickedLayer);
  };

  const changeTemplate = (template: typeof SOCIAL_TEMPLATES[0]) => {
    setCanvasSize({ width: template.width, height: template.height });
  };

  const exportCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !onExport) return;

    setIsLoading(true);
    canvas.toBlob((blob) => {
      if (blob) {
        const filename = `${brandName || 'design'}-${Date.now()}.png`;
        onExport(blob, filename);
      }
      setIsLoading(false);
    }, 'image/png');
  };

  const saveDesign = () => {
    if (!onSave) return;

    const canvasData: CanvasData = {
      imageUrl,
      textLayers,
      dimensions: canvasSize
    };

    onSave(canvasData);
  };

  const selectedLayerData = textLayers.find(layer => layer.id === selectedLayer);
  const availableColors = [...brandColors, ...DEFAULT_COLORS];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col items-center">
        <div className="mb-4 flex flex-wrap gap-2">
          {SOCIAL_TEMPLATES.map((template) => (
            <button
              key={template.name}
              onClick={() => changeTemplate(template)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                canvasSize.width === template.width && canvasSize.height === template.height
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
              }`}
            >
              <span className="mr-1">{template.icon}</span>
              {template.name}
            </button>
          ))}
        </div>

        <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="max-w-full max-h-[70vh] object-contain cursor-pointer"
            style={{ 
              width: '100%', 
              height: 'auto',
              maxWidth: '600px',
              aspectRatio: `${canvasSize.width}/${canvasSize.height}`
            }}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setShowTextTools(!showTextTools)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <TypeIcon size={16} />
            Add Text
          </button>
          <button
            onClick={saveDesign}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all flex items-center gap-2"
          >
            <SaveIcon size={16} />
            Save Design
          </button>
          <button
            onClick={exportCanvas}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <DownloadIcon size={16} />
            {isLoading ? 'Exporting...' : 'Download'}
          </button>
        </div>
      </div>

      {/* Text Tools Panel */}
      {showTextTools && (
        <div className="w-full lg:w-80 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <TypeIcon size={20} />
            Text Tools
          </h3>

          {/* Add New Text */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Text
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter text..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addTextLayer()}
              />
              <button
                onClick={addTextLayer}
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Add
              </button>
            </div>
          </div>

          {/* Edit Selected Text */}
          {selectedLayerData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Edit Selected Text</h4>
                <button
                  onClick={deleteSelectedLayer}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>

              {/* Text Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text
                </label>
                <input
                  type="text"
                  value={selectedLayerData.text}
                  onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size: {selectedLayerData.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={selectedLayerData.fontSize}
                  onChange={(e) => updateSelectedLayer({ fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font
                </label>
                <select
                  value={selectedLayerData.fontFamily}
                  onChange={(e) => updateSelectedLayer({ fontFamily: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {FONT_FAMILIES.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  value={selectedLayerData.fontWeight}
                  onChange={(e) => updateSelectedLayer({ fontWeight: e.target.value as 'normal' | 'bold' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>

              {/* Text Align */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Align
                </label>
                <select
                  value={selectedLayerData.textAlign}
                  onChange={(e) => updateSelectedLayer({ textAlign: e.target.value as 'left' | 'center' | 'right' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableColors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => updateSelectedLayer({ color })}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        selectedLayerData.color === color 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-primary'
                      }`}
                      style={{ backgroundColor: color }}
                      title={index < brandColors.length ? 'Brand Color' : 'Default Color'}
                    />
                  ))}
                </div>
              </div>

              {/* Position */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    X Position
                  </label>
                  <input
                    type="number"
                    value={Math.round(selectedLayerData.x)}
                    onChange={(e) => updateSelectedLayer({ x: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Y Position
                  </label>
                  <input
                    type="number"
                    value={Math.round(selectedLayerData.y)}
                    onChange={(e) => updateSelectedLayer({ y: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Text Layers List */}
          {textLayers.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-2">Text Layers</h4>
              <div className="space-y-2">
                {textLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                      selectedLayer === layer.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="truncate text-sm font-medium">
                      {layer.text || 'Empty Text'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {layer.fontSize}px {layer.fontFamily}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

