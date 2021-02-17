import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
// application
import { AppComponent } from "./app.component";
import { CustomGridExampleComponent, RightClickEditDialog } from './custom-grid-example/custom-grid-example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AgGridModule.withComponents([]),
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule
    ],
    declarations: [
        AppComponent,
        CustomGridExampleComponent,
        RightClickEditDialog
    ],
    entryComponents: [
        RightClickEditDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
