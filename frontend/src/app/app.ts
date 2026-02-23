import { Component } from '@angular/core';
import { AiChat } from "./components/ai-chat/ai-chat";

@Component({
  selector: 'app-root',
  imports: [AiChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
