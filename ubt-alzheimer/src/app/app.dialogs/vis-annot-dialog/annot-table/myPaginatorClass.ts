import {MatPaginatorIntl} from '@angular/material';
export class MyPaginator extends MatPaginatorIntl {
  itemsPerPageLabel = 'Anotaciones:';
  nextPageLabel     = 'Siguiente';
  previousPageLabel = 'Anterior';
}