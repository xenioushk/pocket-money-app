import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Only enable basic formatting
        heading: false, // Disable headings
        code: false, // Disable code
        codeBlock: false, // Disable code blocks
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none p-3 min-h-[150px] focus:outline-none border-2 border-gray-500 rounded",
      },
    },
  })

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border-2 border-gray-500 rounded">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b-2 border-gray-500 bg-gray-50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1 rounded ${editor.isActive("bold") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-200"}`} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1 rounded ${editor.isActive("italic") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-200"}`} title="Italic">
          <em>I</em>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-3 py-1 rounded ${editor.isActive("bulletList") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-200"}`} title="Bullet List">
          • List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-3 py-1 rounded ${editor.isActive("orderedList") ? "bg-gray-800 text-white" : "bg-white hover:bg-gray-200"}`} title="Numbered List">
          1. List
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {placeholder && !editor.getText() && <div className="absolute top-14 left-3 text-gray-400 pointer-events-none">{placeholder}</div>}
    </div>
  )
}

export default RichTextEditor
