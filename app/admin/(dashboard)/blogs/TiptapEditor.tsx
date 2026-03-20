'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Placeholder } from '@tiptap/extensions'

interface TiptapEditorProps {
  initialContent?: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${
        active
          ? 'bg-brand-accent text-white'
          : 'text-brand-text/60 hover:text-brand-text hover:bg-white/8'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-white/10 mx-1" />
}

export default function TiptapEditor({ initialContent, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image.configure({ allowBase64: true, inline: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: false }),
      Placeholder.configure({ placeholder: 'Start writing your blog post here…' }),
    ],
    content: initialContent ?? '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  function addImage() {
    const url = window.prompt('Enter image URL:')
    if (url) editor?.chain().focus().setImage({ src: url }).run()
  }

  function setLink() {
    const url = window.prompt('Enter link URL:')
    if (url) editor?.chain().focus().setMark('link', { href: url }).run()
  }

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-brand-surface-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-white/10 bg-brand-surface">

        {/* Headings */}
        <ToolbarButton title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolbarButton>
        <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>

        <Divider />

        {/* Text formatting */}
        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></ToolbarButton>
        <ToolbarButton title="Highlight" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <span className="bg-yellow-400/80 text-black px-0.5 rounded text-xs">H</span>
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>≡</ToolbarButton>
        <ToolbarButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>☰</ToolbarButton>
        <ToolbarButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>≡</ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>

        <Divider />

        {/* Blocks */}
        <ToolbarButton title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;&rdquo;</ToolbarButton>
        <ToolbarButton title="Horizontal rule" active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>

        <Divider />

        {/* Media & links */}
        <ToolbarButton title="Insert image" active={false} onClick={addImage}>🖼</ToolbarButton>
        <ToolbarButton title="Insert link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>

        <Divider />

        {/* History */}
        <ToolbarButton title="Undo" active={false} onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarButton>
        <ToolbarButton title="Redo" active={false} onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="tiptap-editor min-h-[400px] px-6 py-5 text-brand-text focus:outline-none"
      />
    </div>
  )
}
