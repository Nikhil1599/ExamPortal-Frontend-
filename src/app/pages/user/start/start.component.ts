import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit(): void {
    this.preventBackButton()
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid)
    this.loadQuestion();
  }

  loadQuestion(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions = data;
        this.questions.forEach((q:any)=>{
          q['givenAnswer'] = '';
        })
        console.log(this.questions)
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error while loading questions','error')
      }
    )
  }
  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the exam?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this.questions.forEach((q:any)=>{
          if(q.givenAnswer == q.answer){
            this.correctAnswers++
            let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length
            this.marksGot+=marksSingle;
          }
          console.log("Correct Answer: "+this.correctAnswers)
          console.log("Marks: "+this.marksGot)
        })
      }
    })
  }

}
