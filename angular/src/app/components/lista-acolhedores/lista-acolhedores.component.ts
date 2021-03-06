import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/acolhedor.model';
import { TutorialService } from 'src/app/services/acolhedor.service';

@Component({
  selector: 'app-lista-acolhedores',
  templateUrl: './lista-acolhedores.component.html',
  styleUrls: ['./lista-acolhedores.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  pais = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchCountry(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByCountry(this.pais)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
