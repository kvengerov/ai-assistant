import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiChat } from "./components/ai-chat/ai-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AiChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('test-ng-ai');
}
