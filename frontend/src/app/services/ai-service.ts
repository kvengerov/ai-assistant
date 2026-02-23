import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = '/api/chat'
  public currentMessage = signal<string>('');
  public isGenerating = signal<boolean>(false);
  
  async askAi(prompt: string) {
    this.currentMessage.set('');
    this.isGenerating.set(true);

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });


      if (!res) throw new Error('No body');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        this.currentMessage.update(prev => prev + chunk);
      }
    } catch (error) {
      console.error('AI Error: ', error);
    } finally {
      this.isGenerating.set(false);
    }

  }
}
