"use client";
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function run(region: string) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err?.message || 'Unknown error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-xl font-semibold mb-2">Run pipeline</h2>
        <p className="text-sm text-white/70 mb-4">Trigger a full cycle: trends ? script ? video plan ? sheet ? uploads</p>
        <div className="flex gap-2">
          <button className="button" disabled={loading} onClick={() => run('US')}>Run (US)</button>
          <button className="button" disabled={loading} onClick={() => run('EU')}>Run (EU)</button>
          <button className="button" disabled={loading} onClick={() => run('GLOBAL')}>Run (Global)</button>
        </div>
        {loading && <p className="mt-4 text-sm text-white/70">Running...</p>}
      </section>

      {result && (
        <section className="card">
          <h3 className="text-lg font-semibold mb-2">Result</h3>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
