import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[appDatatable]',
  standalone: true
})
export class DatatableDirective implements AfterViewInit, OnDestroy {

  private observer: MutationObserver | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const tableElement = $(this.el.nativeElement);

    this.observer = new MutationObserver((mutations) => {
      const rowCount = tableElement.find('tbody tr').length;
      if (rowCount > 0 && !$.fn.DataTable.isDataTable(tableElement)) {
        const table = tableElement.DataTable({
          responsive: true,
          paging: true,
          searching: true,
          pageLength: 10,
          lengthChange: true,
          autoWidth: false,
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis']
        });

        // Append buttons
        table.buttons().container().appendTo(
          tableElement.closest('.dataTables_wrapper').find('.col-md-6:eq(0)')
        );

        // Stop observing after init
        this.observer?.disconnect();
      }
    });

    // Observe the tbody for child changes
    this.observer.observe(this.el.nativeElement.querySelector('tbody'), {
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
