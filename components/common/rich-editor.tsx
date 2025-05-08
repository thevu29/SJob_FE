'use client';

import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface RichEditorProps {
  value: string;
  onChange: (content: string, editor: any) => void;
  height?: number;
  placeholder?: string;
  apiKey?: string;
  plugins?: string[];
  toolbar?: string;
  className?: string;
}

export interface RichEditorRef {
  getContent: () => string;
  getTextContent: () => string;
  getDecodedContent: () => string;
  getDecodedTextContent: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

const defaultPlugins = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'fullscreen',
  'insertdatetime',
  'media',
  'table'
  //   'code',
  //   'wordcount'
];

const defaultToolbar =
  'undo redo | formatselect | ' +
  'bold italic underline | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat';

const RichEditor = forwardRef<RichEditorRef, RichEditorProps>(
  (
    {
      value,
      onChange,
      height = 300,
      placeholder = '',
      apiKey = 'kltcedh16tzfbaymo3klyd3yk7t8moi1htts7y97cagszf0m',
      plugins = defaultPlugins,
      toolbar = defaultToolbar,
      className = ''
    },
    ref
  ) => {
    const editorRef = useRef<any>(null);

    const decodeHtmlEntities = (html: string): string => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
    };

    useImperativeHandle(ref, () => ({
      getContent: () => {
        if (editorRef.current) {
          return editorRef.current.getContent();
        }
        return '';
      },
      getTextContent: () => {
        if (editorRef.current) {
          return editorRef.current.getContent({ format: 'text' });
        }
        return '';
      },
      getDecodedContent: () => {
        if (editorRef.current) {
          const content = editorRef.current.getContent();
          return decodeHtmlEntities(content);
        }
        return '';
      },
      getDecodedTextContent: () => {
        if (editorRef.current) {
          const content = editorRef.current.getContent({ format: 'text' });
          return decodeHtmlEntities(content);
        }
        return '';
      },
      setContent: (content: string) => {
        if (editorRef.current) {
          editorRef.current.setContent(content);
        }
      },
      focus: () => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }
    }));

    return (
      <div className={className}>
        <Editor
          apiKey={apiKey}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={value}
          init={{
            height,
            menubar: false,
            plugins,
            toolbar,
            placeholder,
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            branding: false
          }}
          onEditorChange={onChange}
        />
      </div>
    );
  }
);

RichEditor.displayName = 'RichEditor';

export default RichEditor;
