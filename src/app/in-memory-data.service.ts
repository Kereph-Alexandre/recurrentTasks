import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        title: 'vestibulum eget vulputate ut ultrices',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        repeatDelay: 34,
        creationDate: '16/07/2023',
        execDate: '2022-12-24 14:26:43',
        completed: false,
      },
      {
        id: 2,
        title: 'luctus et',
        description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        repeatDelay: 101,
        creationDate: '12/07/2023',
        execDate: '2023-03-22 10:29:34',
        completed: true,
      },
      {
        id: 3,
        title: 'in faucibus orci',
        description:
          'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        repeatDelay: 61,
        creationDate: '10/03/2023',
        execDate: '2023-08-04 23:36:27',
        completed: true,
      },
      {
        id: 4,
        title: 'magna vulputate luctus',
        description:
          'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        repeatDelay: 79,
        creationDate: '29/06/2023',
        execDate: '2023-05-08 09:37:57',
        completed: false,
      },
      {
        id: 5,
        title: 'ac neque',
        description:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        repeatDelay: 59,
        creationDate: '07/03/2023',
        execDate: '2023-02-13 22:47:01',
        completed: true,
      },
      {
        id: 6,
        title: 'velit id pretium iaculis',
        description:
          'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        repeatDelay: 32,
        creationDate: '30/06/2023',
        execDate: '2023-07-05 18:59:41',
        completed: false,
      },
      {
        id: 7,
        title: 'eget',
        description:
          'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        repeatDelay: 133,
        creationDate: '09/10/2023',
        execDate: '2023-10-07 12:19:48',
        completed: true,
      },
      {
        id: 8,
        title: 'congue eget semper rutrum',
        description:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        repeatDelay: 99,
        creationDate: '22/11/2023',
        execDate: '2023-08-27 22:40:27',
        completed: false,
      },
      {
        id: 9,
        title: 'id',
        description:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        repeatDelay: 27,
        creationDate: '16/04/2023',
        execDate: '2023-07-31 00:07:52',
        completed: false,
      },
      {
        id: 10,
        title: 'nam tristique',
        description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        repeatDelay: 109,
        creationDate: '13/10/2023',
        execDate: '2023-04-21 23:22:34',
        completed: true,
      },
    ];

    return { tasks };
  }
}
