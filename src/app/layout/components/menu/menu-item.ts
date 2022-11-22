
export class MenuItem {
    label!: string;
    icon!: string;
    link?: string;
    submenus?: MenuItem[];
    //permissao?: PermissaoType;
    permitido?: boolean;
    //authService!: AuthService;

    public constructor(init?: Partial<MenuItem>) {
        Object.assign(this, init);
    }

    get mostrar() {
        // if (this.submenus?.some((s) => s.permissao && this.getPermitidoAcessar(s.permissao))) {
        //     return true;
        // }
        // if (this.permissao) {
          if (true) {
            return true;
            // return this.getPermitidoAcessar(this.permissao);
        }
        return false;
    }

    // private getPermitidoAcessar(permissao: PermissaoType) {
    //     return this.authService.validarPermissao(permissao.enumName);
    // }
}
