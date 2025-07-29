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
            label: 'Notificações',
            icon: 'assignment',
            link: '',
            // authService: this.authService,
            submenus: [
                new MenuItem({
                    label: 'Notificar',
                    icon: 'request_quote',
                    link: 'notificacoes/notificar',
                    // permissao: PermissaoType.ACESSO_PAGINA_FATURAMENTO,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Pesquisar veiculo',
                    icon: 'payments',
                    link: 'notificacoes/pesquisar',
                    // permissao: PermissaoType.ACESSO_PAGINA_REPASSE,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Ranking',
                    icon: 'credit_score',
                    link: 'notificacoes/pagamento-fixo',
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
                    label: 'Veículos',
                    icon: 'splitscreen',
                    link: 'app/gerenciar/selecionar-config-especializacao',
                    // permissao: PermissaoType.ACESSO_PAGINA_ESPECIALIZACOES,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Relatório da KM do veículo',
                    icon: 'price_check',
                    link: 'app/gerenciar/tabela-de-valores',
                    // permissao: PermissaoType.ACESSO_PAGINA_TABELA_VALORES,
                    // authService: this.authService,
                }),

                new MenuItem({
                    label: 'Cadastrar veículos',
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
