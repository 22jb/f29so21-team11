import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './componants/home-page/home-page.component';
import { ChatScreenLayoutComponent } from './componants/chat-screen-layout/chat-screen-layout.component';
import { ChatWindowComponent } from './componants/chat-window/chat-window.component';
import { LoginPageComponent } from './componants/login-page/login-page.component';
import { RoomIdExistsGuard } from './guards/room-id-exists/room-id-exists.guard';
import { WhiteboardComponent } from './componants/whiteboard/whiteboard.component';
import { GroupRoomComponent } from './componants/group-room/group-room.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'chat',
    component: ChatScreenLayoutComponent,
    children: [{ path: ':id', component: ChatWindowComponent, canActivate: [RoomIdExistsGuard]}],
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'whiteboard',
    component: GroupRoomComponent,
    children: [{ path: ':id', component: WhiteboardComponent, canActivate: [RoomIdExistsGuard]}],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
