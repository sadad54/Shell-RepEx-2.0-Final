import { useState, useCallback } from 'react'
import { UploadCloud, FileText, Image, Archive, X, CheckCircle, Brain } from 'lucide-react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { cn } from './ui/utils'
import { AnalysisResults } from './AnalysisResults'

interface UploadZoneProps {
  className?: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return FileText
  if (type.includes('image')) return Image
  if (type.includes('zip') || type.includes('archive')) return Archive
  return FileText
}

export function UploadZone({ className }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{ files: Array<{ name: string; id: string }> } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    }))

    setFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload progress
    newFiles.forEach((file, index) => {
      simulateUpload(file.id, index * 500)
    })
  }

  const simulateUpload = (fileId: string, delay: number) => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(file => {
          if (file.id === fileId && file.status === 'uploading') {
            const newProgress = Math.min(file.progress + Math.random() * 20, 100)
            const newStatus = newProgress === 100 ? 'processing' : 'uploading'
            
            if (newStatus === 'processing') {
              // After processing delay, mark as complete
              setTimeout(() => {
                setFiles(prev => prev.map(f => 
                  f.id === fileId ? { ...f, status: 'complete' } : f
                ))
              }, 2000)
            }
            
            return { ...file, progress: newProgress, status: newStatus }
          }
          return file
        }))
      }, 200)

      setTimeout(() => clearInterval(interval), 5000)
    }, delay)
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const analyzeFiles = () => {
    const completedFilesList = files.filter(f => f.status === 'complete')
    if (completedFilesList.length === 0) return

    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        files: completedFilesList.map(f => ({ name: f.name, id: f.id }))
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const clearAll = () => {
    setFiles([])
    setAnalysisResults(null)
    setIsAnalyzing(false)
  }

  const hasFiles = files.length > 0
  const processingFiles = files.filter(f => f.status === 'processing').length
  const completedFiles = files.filter(f => f.status === 'complete').length

  // Show analysis results if available
  if (analysisResults) {
    return (
      <div className={cn("space-y-6", className)}>
        <AnalysisResults 
          files={analysisResults.files} 
          onClose={() => setAnalysisResults(null)}
        />
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Upload Zone */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer group",
          isDragOver 
            ? "border-primary bg-primary/5 scale-102" 
            : "border-border hover:border-primary/50 hover:bg-primary/5",
          hasFiles && completedFiles > 0 && "border-accent/40 bg-accent/5",
          hasFiles && completedFiles === 0 && "border-primary/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.zip,.rar,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Upload Icon */}
        <div className={cn(
          "mx-auto mb-6 transition-all duration-300",
          isDragOver ? "scale-110" : "group-hover:scale-105"
        )}>
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <UploadCloud className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Upload Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Drag & Drop Your Incident Report
          </h3>
          <p className="text-muted-foreground">
            or click to browse • PDF, ZIP up to 50MB
          </p>
        </div>

        {/* Supported Formats */}
        <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </div>
          <div className="flex items-center space-x-1">
            <Archive className="w-4 h-4" />
            <span>ZIP</span>
          </div>
          <div className="flex items-center space-x-1">
            <Image className="w-4 h-4" />
            <span>Images</span>
          </div>
        </div>

        {/* Processing Status */}
        {(processingFiles > 0 || isAnalyzing) && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                {isAnalyzing ? (
                  <Brain className="w-8 h-8 text-accent animate-pulse" />
                ) : (
                  <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <div>
                <p className="font-medium">
                  {isAnalyzing 
                    ? `Analyzing ${completedFiles} file${completedFiles > 1 ? 's' : ''}...`
                    : `Processing ${processingFiles} file${processingFiles > 1 ? 's' : ''}...`
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  {isAnalyzing 
                    ? 'AI is extracting insights and patterns'
                    : 'This may take a few moments'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {hasFiles && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            Uploaded Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file) => {
              const Icon = getFileIcon(file.type)
              return (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        {file.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-5 h-5 p-0 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {file.status !== 'complete' && (
                      <div className="mt-2 space-y-1">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {file.status === 'uploading' 
                            ? `Uploading... ${Math.round(file.progress)}%`
                            : 'Processing...'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          {completedFiles > 0 && !isAnalyzing && (
            <div className="flex space-x-3 pt-4">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={analyzeFiles}
                disabled={isAnalyzing}
              >
                <Brain className="w-4 h-4 mr-2" />
                Analyze Files ({completedFiles})
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}