import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchDTO } from '../DTOs/watchDTO';
import { watchService } from '../watch.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class ProductDetailsComponent implements OnInit {
  watch!: WatchDTO;

  constructor(private route: ActivatedRoute, private watchservice: watchService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.watchservice.getWatchById(id).subscribe({
        next: data => {
          this.watch = data;
        },
        error: err => {
          console.log('Failed to load watch details', err);
        }
      });
    }
  }
  goBack(): void {
    window.history.back();
  }
}