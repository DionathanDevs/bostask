import { Pipe, PipeTransform } from '@angular/core';
import { Task, TagId } from '../models/task.model';

@Pipe({
  name: 'filterByTag',
  standalone: true,
  pure: false, // re-evaluate when signal changes
})
export class FilterByTagPipe implements PipeTransform {
  transform(tasks: Task[], tag: TagId): Task[] {
    if (!tag || tag === 'all') return tasks;
    return tasks.filter(t => t.tag === tag);
  }
}
