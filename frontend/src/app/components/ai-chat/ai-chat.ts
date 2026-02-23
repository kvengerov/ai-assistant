import { Component, inject } from '@angular/core';
import { AiService } from '../../services/ai-service';

@Component({
  selector: 'app-ai-chat',
  imports: [],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat {
  public aiService: AiService = inject(AiService);

}
