import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { CheckboxModule } from 'primeng/checkbox';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message"; 

import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,    
    DropdownModule,
    ConfirmPopupModule,
    CheckboxModule,
    RippleModule,
    MessageModule,
    MessagesModule,


    AccordionModule,
    AutoCompleteModule,

    CalendarModule,
    DialogModule,
    DividerModule,
    FileUploadModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    OverlayPanelModule,
    ProgressBarModule,
    SkeletonModule,
    TableModule,
    TabViewModule,
    TagModule,
    TimelineModule,
    TooltipModule,
    ToastModule
  ]
})
export class PrimeNGModule { }
