import { extend } from 'lodash';
import { GenderEnum } from 'src/app/class/gender';
import { IdUser } from 'src/app/class/typesKeyword';
import { User } from 'src/app/class/user';
import { week } from '../client/client.class';
import { Company, creditType } from '../../demo/domain/company.class';

export class UserMantainer {
  employee?: EmployeUserMantainer;
  id?: IdUser;
  password?: string;
  permissionTemplate?: string | null;
  permissionUser?: UserPermissionPermissions[];
  username?: string;
  enable?: boolean;
  constructor() {}
}

export class EmployeUserMantainer {
  email?: string;
  firstLastName?: string;
  genderId?: GenderEnum;
  id?: number;
  name?: string;
  secondLastName?: string;
  urlPhoto?: string;
}

export class PermissionTemplateUserMantainer {
  code?: string;
  description?: string;
  isActive?: boolean;
  isRemovable?: boolean;
  name?: string;
}

export class UserPermission {
  permissionTemplateCode?: string;
  permissions?: UserPermissionPermissions[];

  validateUserPermission() {
    this.permissions = this.permissions ? this.permissions : [];

    if (this.permissions && this.permissions.length > 0) {
      this.permissions.forEach((permissions) => {
        permissions.children = permissions.children ? permissions.children : [];
      });
    }
  }
}

export class UserPermissionPermission {
  code?: string;
  description?: string;
  frontSelCheck?: boolean;
}

export class UserPermissionPermissions extends UserPermissionPermission {
  children?: UserPermissionPermission[];
  constructor() {
    super();
  }
}

export class UsersListResponse {
  results?: UserMantainer[];
  totalRecords?: number;
}

export class documentType {
  document ?:string;
  id?: number;
}

export class Credit{
  creditLine?: number;
  credit_line ?: number;
  days ?: week = new week();
  enable ?: boolean;
  payment_date_type ?: string;
  creditType?:creditType
}

export class UserModelCorporative {
  id?: number;
  uuid?: string;
  document?: string;
  documentType?: documentType = new documentType();
  firstName?: string;
  firstLastName?: string;
  secondLastName?: string;
  email?: string;
  cellPhone?: string;
  countryCode?: string;
  credit ?: Credit = new Credit();
  exigent?: boolean;
  vip?: boolean;
  observation?: string;
  company?: Company[] = [new Company];
  gender?: gender = new gender();
  enable?: boolean;
  password?: string;
}

export class gender {
  id?: number;
  name?: string;
}
