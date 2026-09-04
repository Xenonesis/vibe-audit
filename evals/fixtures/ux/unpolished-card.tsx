import React from 'react';

export function ProjectCard({ id }: { id: string }) {
  return (
    <div className="border p-4 rounded">
      <h3>Project Dashboard</h3>

      {/* Fitts's Law: undersized icon target (<32px, p-0) */}
      <button className="p-0 text-gray-400">
        <span>Edit</span>
      </button>

      {/* Doherty Threshold: async submit without loading indicator */}
      <button onClick={async () => await fetch(`/api/sync/${id}`)}>
        Sync Now
      </button>

      {/* Peak-End Rule: direct destructive action without confirmation */}
      <button onClick={() => deleteProject(id)}>
        Delete Permanently
      </button>
    </div>
  );
}
