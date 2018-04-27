import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import 'dhtmlx-scheduler';
import { } from '@types/dhtmlxscheduler';
import { EventService } from '../shared/event.service';
import { Event } from '../shared/event';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-appointment-book',
  templateUrl: './appointment-book.component.html',
  styleUrls: ['./appointment-book.component.scss']
})
export class AppointmentBookComponent implements OnInit {
  @ViewChild('scheduler_here') schedulerContainer: ElementRef;

  constructor(private eventService: EventService) { }
  ngOnInit() {
    scheduler.date.week_start = scheduler.date.day_start;
    scheduler.config.xml_date = '%Y-%m-%d %H:%i';
    scheduler.init(this.schedulerContainer.nativeElement);

    scheduler.attachEvent('onEventAdded', (id, ev) => {
      this.eventService.insert(this.serializeEvent(ev, true))
        .then((response) => {
          if (response.id !== id) {
            scheduler.changeEventId(id, response.id);
          }
        });
    });

    scheduler.attachEvent('onEventChanged', (id, ev) => {
      this.eventService.update(this.serializeEvent(ev));
    });

    scheduler.attachEvent('onEventDeleted', (id) => {
      this.eventService.remove(id);
    });

    this.eventService.get()
      .then((data) => {
        scheduler.parse(data, 'json');
      });
  }
  private serializeEvent(data: any, insert: boolean = false): Event {
    const result = {};

    for (const i in data) {
      if (i.charAt(0) === '$' || i.charAt(0) === '_') {
        continue;
      }
      if (insert && i === 'id') {
        continue;
      }
      if (data[i] instanceof Date) {
        result[i] = scheduler.templates.xml_format(data[i]);
      } else {
        result[i] = data[i];
      }
    }
    return result as Event;
  }


}
