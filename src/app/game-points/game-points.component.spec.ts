import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePointsComponent } from './game-points.component';

describe('GamePointsComponent', () => {
  let component: GamePointsComponent;
  let fixture: ComponentFixture<GamePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
