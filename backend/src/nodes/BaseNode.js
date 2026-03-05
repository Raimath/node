import React from 'react';
import { Handle } from 'reactflow';

const BaseNode = ({ id, label, children, handles = [] }) => {
    console.log(id, label, children, handles);
    return (
        <div className="base-node">
            <div className="node-header">
                {label}
            </div>
            <div className="node-body">
                {children}
            </div>

            {/* Common handle logic */}
            {handles.map((handle, idx) => (
                <Handle
                    key={idx}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={handle.style}
                />
            ))}
        </div>
    );
};

export default BaseNode;
