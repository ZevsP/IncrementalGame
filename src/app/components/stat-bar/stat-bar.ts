import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stat-bar',
  imports: [DecimalPipe],
  template: `
    <div class="stat-bar-container">
      <div class="stat-bar-header">
        <span class="stat-icon"><i [class]="icon()"></i></span>
        <span class="stat-label">{{ label() }}</span>
        <span class="stat-value">{{ value() | number:'1.0-0' }}/{{ max() }}</span>
      </div>
      <div class="stat-bar-track">
        <div 
          class="stat-bar-fill" 
          [style.width.%]="(value() / max()) * 100"
          [style.background-color]="getBarColor()">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-bar-container {
      margin-bottom: 8px;
    }
    
    .stat-bar-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-size: 14px;
    }
    
    .stat-icon {
      width: 20px;
      text-align: center;
    }
    
    .stat-label {
      flex: 1;
      font-weight: 500;
    }
    
    .stat-value {
      color: #666;
      font-size: 12px;
    }
    
    .stat-bar-track {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .stat-bar-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatBar {
  label = input.required<string>();
  value = input.required<number>();
  max = input<number>(100);
  icon = input<string>('bi-circle-fill');
  color = input<string>('');

  getBarColor(): string {
    if (this.color()) {
      return this.color();
    }
    
    const percentage = (this.value() / this.max()) * 100;
    if (percentage > 70) return '#4caf50';
    if (percentage > 30) return '#ff9800';
    return '#f44336';
  }
}
