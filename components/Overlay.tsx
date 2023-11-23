"use client";

interface OverlayProps {
  visible: boolean;
}

const Overlay = ({ visible }: OverlayProps) => {
  if (!visible) return null;

  return (
    <div className="fixed z-40 w-full h-full top-0 right-0 bg-[rgba(0,0,0,0.4)]" />
  );
};

export default Overlay;
