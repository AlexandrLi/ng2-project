import { LoaderService } from './../../shared/loader/loader.service';
import { Router } from '@angular/router';
import { CoursesService, CourseHighlightDirective, FilterPipe } from './../shared';
import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    SimpleChanges,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked,
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['./course-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked,
    AfterContentInit,
    OnDestroy {

    public courses: Course[];
    public filteredCourses: Course[];
    public query: string = '';

    constructor(
        private coursesService: CoursesService,
        private router: Router,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef,
        private filterPipe: FilterPipe) {
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            let deleted: boolean;
            this.coursesService.removeItem(id).subscribe((result) => deleted = result);
            if (deleted) {
                this.updateCourses();
            }
        }
    }

    public filter(query: string) {
        this.query = query;
        this.filteredCourses = this.filterPipe.transform(this.courses, query);
    }

    public ngOnInit(): void {
        this.updateCourses();
    }

    public ngAfterContentInit(): void {
        // remove no_empty rule notification
    }

    public ngAfterContentChecked(): void {
        // remove no_empty rule notification
    }

    public ngAfterViewInit(): void {
        // remove no_empty rule notification
    }

    public ngAfterViewChecked(): void {
        // remove no_empty rule notification
    }

    public ngOnDestroy(): void {
        // remove no_empty rule notification
    }

    public ngDoCheck(): void {
        // remove no_empty rule notification
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // remove no_empty rule notification
    }

    private updateCourses(): void {
        this.loaderService.show();
        this.coursesService.getList()
            .subscribe((courses) => {
                this.courses = courses;
                this.filter(this.query);
                this.ref.markForCheck();
            },
            null,
            () => this.loaderService.hide());
    }
}
