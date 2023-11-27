import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const tasks = [
      {
        id: 1,
        title: 'nulla sed accumsan felis ut',
        description:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        repeatDelay: 133,
        creationDate: '10/10/2023',
        execDate: '29/11/2023',
        completed: true,
      },
      {
        id: 2,
        title: 'vivamus in felis eu sapien',
        description:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        repeatDelay: 163,
        creationDate: '21/04/2023',
        execDate: '01/05/2023',
        completed: false,
      },
      {
        id: 3,
        title: 'metus sapien ut',
        description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
        repeatDelay: 172,
        creationDate: '22/01/2023',
        execDate: '02/04/2023',
        completed: false,
      },
      {
        id: 4,
        title: 'sit',
        description:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        repeatDelay: 124,
        creationDate: '08/02/2023',
        execDate: '01/07/2023',
        completed: true,
      },
      {
        id: 5,
        title: 'ipsum primis',
        description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        repeatDelay: 4,
        creationDate: '09/06/2023',
        execDate: '08/11/2023',
        completed: false,
      },
      {
        id: 6,
        title: 'vulputate ut ultrices',
        description:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        repeatDelay: 99,
        creationDate: '03/12/2022',
        execDate: '20/12/2023',
        completed: true,
      },
      {
        id: 7,
        title: 'mi integer',
        description:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        repeatDelay: 51,
        creationDate: '14/05/2023',
        execDate: '11/09/2023',
        completed: true,
      },
      {
        id: 8,
        title: 'quis lectus suspendisse',
        description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        repeatDelay: 169,
        creationDate: '19/04/2023',
        execDate: '02/11/2023',
        completed: true,
      },
      {
        id: 9,
        title: 'cum sociis',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        repeatDelay: 139,
        creationDate: '11/01/2023',
        execDate: '23/07/2023',
        completed: false,
      },
      {
        id: 10,
        title: 'metus sapien ut nunc',
        description:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
        repeatDelay: 85,
        creationDate: '03/03/2023',
        execDate: '30/05/2023',
        completed: false,
      },
    ];

    return tasks;
  }
}
