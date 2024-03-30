import { useRef, useEffect } from 'react'
import JoditEditor from 'jodit-react'

const Editor = ({ value, onChange }) => {
  const editor = useRef(null)

  // Set initial content when the value prop changes
  useEffect(() => {
    if (editor.current) {
      editor.current.value = value
    }
  }, [value])

  // Update parent component with new content when editor content changes
  const handleEditorChange = (newContent) => {
    if (onChange) {
      onChange(newContent)
    }
  }

  return (
    <div>
      <JoditEditor ref={editor} value={value} onChange={handleEditorChange} />
    </div>
  )
}

export default Editor
