import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Gender, Interest } from '../../models/player.model';

@Component({
  selector: 'app-character-setup-view',
  imports: [RouterLink, FormsModule],
  templateUrl: './character-setup-view.html',
  styleUrl: './character-setup-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSetupView {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  
  readonly playerName = signal('');
  readonly playerGender = signal<Gender>('male');
  readonly playerAge = signal(10);
  readonly selectedInterests = signal<Interest[]>([]);
  
  readonly availableInterests: { id: Interest; label: string; icon: string }[] = [
    { id: 'sport', label: 'Спорт', icon: 'bi-bicycle' },
    { id: 'music', label: 'Музыка', icon: 'bi-music-note-beamed' },
    { id: 'reading', label: 'Чтение', icon: 'bi-book' },
    { id: 'cooking', label: 'Кулинария', icon: 'bi-egg-fried' },
    { id: 'gaming', label: 'Игры', icon: 'bi-controller' },
    { id: 'art', label: 'Искусство', icon: 'bi-palette' }
  ];
  
  readonly minAge = 10;
  readonly maxAge = 50;
  
  onNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.playerName.set(target.value);
  }
  
  onGenderChange(gender: Gender): void {
    this.playerGender.set(gender);
  }
  
  onAgeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.playerAge.set(parseInt(target.value, 10));
  }
  
  toggleInterest(interest: Interest): void {
    const current = this.selectedInterests();
    if (current.includes(interest)) {
      this.selectedInterests.set(current.filter(i => i !== interest));
    } else if (current.length < 3) {
      this.selectedInterests.set([...current, interest]);
    }
  }
  
  isInterestSelected(interest: Interest): boolean {
    return this.selectedInterests().includes(interest);
  }
  
  canStartGame(): boolean {
    return this.playerName().trim().length >= 2 && 
           this.selectedInterests().length >= 1;
  }
  
  randomize(): void {
    const names = ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Иван', 'Елена'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    this.playerName.set(randomName);
    
    const genders: Gender[] = ['male', 'female'];
    this.playerGender.set(genders[Math.floor(Math.random() * genders.length)]);
    
    this.playerAge.set(Math.floor(Math.random() * (this.maxAge - this.minAge + 1)) + this.minAge);
    
    // Fisher-Yates shuffle for proper randomization
    const allInterests = this.availableInterests.map(i => i.id);
    for (let i = allInterests.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allInterests[i], allInterests[j]] = [allInterests[j], allInterests[i]];
    }
    this.selectedInterests.set(allInterests.slice(0, 2));
  }
  
  startGame(): void {
    if (!this.canStartGame()) return;
    
    this.gameService.initializeGame(
      this.playerName(),
      this.playerGender(),
      this.playerAge(),
      this.selectedInterests()
    );
    
    this.gameService.startGame();
    this.router.navigate(['/game']);
  }
}
