// import { AuthService } from 'src/app/core/auth/auth.service';
// import { PermissaoType } from 'src/app/shared/models/permissao-type';
import { MenuItem } from './menu-item';

export class AppMenuConfig {
    readonly MENU: MenuItem[] = [
        new MenuItem({
            label: 'Dashboard',
            icon: 'dashboard',
            link: 'dashboard',
            // permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
            // authService: this.authService,
        }),
        new MenuItem({
            label: 'Ferramentas',
            icon: 'account_tree',
            link: '',
            // authService: this.authService,

            submenus: [
                new MenuItem({
                    label: 'Relatório',
                    icon: 'receipt_long',
                    link: 'dados/endereco',
                    // permissao: PermissaoType.ACESSO_PAGINA_PACIENTES,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Agentes',
                    icon: 'groups_2',
                    link: 'dados/contato',
                    // permissao: PermissaoType.ACESSO_PAGINA_ROTINA_SALA,
                    // authService: this.authService,
                }),
                new MenuItem({
                  label: 'Equipes',
                  icon: 'group_work',
                  link: 'dados/equipe',
                  // permissao: PermissaoType.ACESSO_PAGINA_ROTINA_SALA,
                  // authService: this.authService,
              }),


            ],
        }),
        new MenuItem({
            label: 'Fechamento',
            icon: 'assignment',
            link: '',
            // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Faturamento',
                    icon: 'request_quote',
                    link: 'app/fechamento/faturamento',
                    // permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Repasse',
                    icon: 'payments',
                    link: 'app/fechamento/repasse',
                    // permissao: PermissaoType.ACESSO_PAGINA_REPASSE,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Pagamento Fixo',
                    icon: 'credit_score',
                    link: 'app/fechamento/pagamento-fixo',
                    // permissao: PermissaoType.ACESSO_PAGINA_REPASSE,
                    // authService: this.authService,
                }),
            ],
        }),
        new MenuItem({
            label: 'Gerenciar',
            icon: 'settings',
            link: '',
           // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Especializações',
                    icon: 'splitscreen',
                    link: 'app/gerenciar/selecionar-config-especializacao',
                    // permissao: PermissaoType.ACESSO_PAGINA_ESPECIALIZACOES,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Tabela de Valores',
                    icon: 'price_check',
                    link: 'app/gerenciar/tabela-de-valores',
                    // permissao: PermissaoType.ACESSO_PAGINA_TABELA_VALORES,
                    // authService: this.authService,
                }),

                new MenuItem({
                    label: 'Salas',
                    icon: 'group_work',
                    link: 'app/gerenciar/config-salas',
                    // permissao: PermissaoType.ACESSO_PAGINA_SALAS,
                    // authService: this.authService,
                }),


            ],
        }),

    ];

    // constructor(private authService: AuthService) {}
    constructor() {}
}
