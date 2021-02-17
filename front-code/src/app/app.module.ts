import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
// application
import { AppComponent } from "./app.component";
// rich grid
import { RichGridComponent } from "./rich-grid-example/rich-grid.component";
import { DateComponent } from "./date-component/date.component";
import { SortableHeaderComponent } from "./header-component/sortable-header.component";
import { HeaderGroupComponent } from "./header-group-component/header-group.component";
import { RendererComponent } from './renderer-component/renderer.component';
import {ProficiencyFilter} from "./filters/proficiency.component.filter";
import {SkillFilter} from "./filters/skill.component.filter";
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
        AgGridModule.withComponents(
            [
                DateComponent,
                SortableHeaderComponent,
                HeaderGroupComponent,
                RendererComponent,
                ProficiencyFilter,
                SkillFilter
            ]
        ),
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule
    ],
    declarations: [
        AppComponent,
        RichGridComponent,
        DateComponent,
        SortableHeaderComponent,
        HeaderGroupComponent,
        RendererComponent,
        ProficiencyFilter,
        SkillFilter,
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
