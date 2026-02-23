import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { AiService } from '../../services/ai-service';

@Component({
  selector: 'app-ai-chat',
  imports: [],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat {
  public aiService: AiService = inject(AiService);
  
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  
  onSubmit(input: HTMLInputElement) {
    const value = input.value.trim();
    if (value && !this.aiService.isGenerating()) {
      this.aiService.askAi(value);
      input.value = '';
    }
  }
  
  clearChat() {
    this.aiService.clearHistory();
  }
}
