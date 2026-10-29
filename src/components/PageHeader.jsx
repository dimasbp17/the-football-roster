import React from 'react';

const PageHeader = ({ eyebrow, title, description, children }) => {
  return (
    <section className="relative overflow-hidden border-b pt-28 pb-10 border-white/10">
      <div className="absolute inset-0 pitch-lines [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute rounded-full -right-24 -top-24 size-96 bg-volt/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 px-4 mx-auto max-w-7xl md:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 animate-fade-up">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="text-5xl italic font-extrabold leading-none uppercase md:text-7xl font-display">
            {title}
          </h1>
          {description && (
            <p className="max-w-xl text-white/60">{description}</p>
          )}
        </div>
        {children && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
