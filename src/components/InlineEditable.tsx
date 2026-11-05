import React, { useRef, useEffect } from 'react';

interface InlineEditableProps {
  isEditing: boolean;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  placeholder?: string;
  style?: React.CSSProperties;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  isEditing,
  value,
  onChange,
  className = '',
  as: Component = 'span',
  placeholder = '',
  style,
}) => {
  const elementRef = useRef<HTMLElement>(null);

  // Sync internal text content with incoming value when not currently focused
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      if (elementRef.current.textContent !== value) {
        elementRef.current.textContent = value;
      }
    }
  }, [value, isEditing]);

  if (!isEditing) {
    return (
      <Component className={className} style={style}>
        {value || placeholder}
      </Component>
    );
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = (e.currentTarget.textContent || '').trim();
    if (newText !== value) {
      onChange(newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // If Enter is pressed on single-line items, commit and blur
    if (e.key === 'Enter' && Component !== 'p' && Component !== 'div') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <Component
      ref={elementRef as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} outline-dashed outline-1 outline-amber-400 bg-amber-500/15 hover:bg-amber-500/25 px-1 py-0.5 rounded transition-all cursor-text focus:outline-2 focus:outline-amber-300 focus:bg-amber-500/30 text-white select-text inline-block`}
      style={style}
      title="Tocca per modificare questo testo"
    >
      {value || placeholder}
    </Component>
  );
};
