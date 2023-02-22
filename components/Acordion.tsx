import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    content: string;
    hasButton?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, hasButton = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container px-4 mx-auto">
            <div className="items-center justify-between w-full p-5 font-medium text-left text-gray-500  ">
                <h3 className="cursor-pointer font-medium text-lg border-b border-gray-700 " onClick={() => setIsOpen(!isOpen)}>{title}</h3>
                <p className= {`mt-2 text-sm text-zinc-600 ${isOpen ? 'block' : 'hidden'}`}>
                    {content}
                    {hasButton && <button className="bg-blue-600 text-white p-2 rounded-md">Button</button>}

            </p>
        </div>
        </div>
    );
};

const Acordion = () => {
    return (
        <div>
            <Accordion title="Título 1" content="Conteúdo 1"/>
            <Accordion title="Título 2" content="Conteúdo 2" hasButton={true}/> 
            <Accordion title="Título 3" content="Conteúdo 3" />
        </div>
    );
}

export default Acordion;
