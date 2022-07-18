import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nexus-modal-trip-history',
  templateUrl: './modal-trip-history.component.html',
  styleUrls: ['./modal-trip-history.component.scss']
})
export class ModalTripHistoryComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
