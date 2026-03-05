// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='note' label='Note' />
            <DraggableNode type='math' label='Math' />
            <DraggableNode type='file' label='File' />
            <DraggableNode type='logic' label='Logic' />
            <DraggableNode type='logger' label='Logger' />
        </div>
    );
};
