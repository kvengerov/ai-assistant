import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = '/api/chat';
  public currentMessage = signal<string>('');
  public isGenerating = signal<boolean>(false);
  
  // Conversation history for memory
  private messages: ChatMessage[] = [];
  
  // Get all messages for display
  getMessages(): ChatMessage[] {
    return this.messages;
  }
  
  async askAi(prompt: string) {
    // Add user message to history
    this.messages.push({ role: 'user', content: prompt });
    
    this.currentMessage.set('');
    this.isGenerating.set(true);

    try {
      // Send conversation history to backend
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: this.messages }),
      });

      if (!res) throw new Error('No body');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        assistantResponse += chunk;
        this.currentMessage.update(prev => prev + chunk);
      }
      
      // Add assistant response to history
      if (assistantResponse) {
        this.messages.push({ role: 'assistant', content: assistantResponse });
      }
    } catch (error) {
      console.error('AI Error: ', error);
    } finally {
      this.isGenerating.set(false);
    }
  }
  
  // Clear conversation history
  clearHistory() {
    this.messages = [];
    this.currentMessage.set('');
  }
}
