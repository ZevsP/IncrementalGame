import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {

  count = signal<number>(0);

  doublecount = computed(() => this.count() * 2);

  ngOnInit(): void {
    console.log('Counter component initialized');
    setInterval(() => {
      this.increment();
    if (this.count() > 100){
      this.count.set(0);
    }
    }, 20);
  }

  increment() {
    this.count.update(value => value + 1);
  }

  reset() {
    this.count.set(0);
  }
}
