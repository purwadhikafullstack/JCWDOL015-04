'use client';

import ShareButton from "@/components/share/shareButton";



export default function MockPage() {
  const mockSlug = 'example-post';

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Share Buttons Mock Page</h1>

      <p className="mb-4">
        This is a mock page for testing the share buttons component. You can use
        the buttons below to share this example post with a custom message.
      </p>

      <ShareButton slug={mockSlug} />
    </div>
  );
}
