import {Injectable, inject} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  http = inject(HttpClient);
  env = environment;

   public async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses; 
  }

  public async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course);
    const response = await firstValueFrom(course$);
    return response;
  }

  public async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
    const response = await firstValueFrom(course$);
    return response;
  } 

  public async deleteCourse(courseId: string) {
    const delete$ = this.http.delete(`${this.env.apiRoot}/courses/${courseId}`)
    const response = await firstValueFrom(delete$);
    return response;
  }

}
