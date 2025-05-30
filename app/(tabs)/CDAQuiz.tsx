import React, { useState, useEffect } from 'react';
import { Pressable, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';
import { NierStyles, NierTheme } from '@/constants/NierTheme';

interface QuizQuestion {
    id: number;
    bloc: 'BLOC_1' | 'BLOC_2' | 'BLOC_3';
    category: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'NOVICE' | 'INTERMEDIATE' | 'EXPERT';
}

const CDA_QUIZ_DATA: QuizQuestion[] = [
    // BLOC 1 - Questions Spring Boot & Java
    {
        id: 1,
        bloc: 'BLOC_1',
        category: 'SPRING_BOOT',
        question: 'Quelle annotation Spring Boot permet d\'injecter automatiquement une dépendance ?',
        options: ['@Inject', '@Autowired', '@Resource', '@Component'],
        correctAnswer: 1,
        explanation: '@Autowired est l\'annotation principale de Spring pour l\'injection de dépendances. Elle fonctionne par type (by type) et peut être appliquée sur les constructeurs, setters ou directement sur les champs. Spring recherche automatiquement un bean du même type dans le contexte.',
        difficulty: 'NOVICE'
    },
    {
        id: 2,
        bloc: 'BLOC_1',
        category: 'SPRING_SECURITY',
        question: 'Dans Spring Security, quel mécanisme est utilisé pour l\'authentification JWT ?',
        options: ['Session cookies', 'Bearer Token dans l\'en-tête Authorization', 'URL parameters', 'Form-based authentication'],
        correctAnswer: 1,
        explanation: 'JWT (JSON Web Token) utilise le pattern Bearer Token. Le token est envoyé dans l\'en-tête HTTP "Authorization: Bearer <token>". Ce mécanisme est stateless, contrairement aux sessions, et permet une scalabilité horizontale des applications.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 3,
        bloc: 'BLOC_1',
        category: 'JAVA',
        question: 'Quelle est la différence principale entre ArrayList et LinkedList en Java ?',
        options: ['ArrayList est thread-safe, LinkedList non', 'ArrayList utilise un tableau, LinkedList une liste chaînée', 'LinkedList est plus rapide pour tous les accès', 'Aucune différence significative'],
        correctAnswer: 1,
        explanation: 'ArrayList utilise un tableau redimensionnable en interne, offrant un accès O(1) par index mais un coût O(n) pour les insertions/suppressions au milieu. LinkedList utilise une liste doublement chaînée, avec O(1) pour les insertions/suppressions aux extrémités mais O(n) pour l\'accès par index.',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 1 - Questions Angular 19
    {
        id: 4,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle nouvelle fonctionnalité d\'Angular 19 améliore les performances de détection des changements ?',
        options: ['OnPush strategy seulement', 'Zoneless change detection', 'Ivy renderer', 'Standalone components'],
        correctAnswer: 1,
        explanation: 'Angular 19 introduit la détection de changements sans Zone.js (zoneless change detection). Cette approche utilise les signals et permet un contrôle plus fin et performant de la détection des changements, réduisant significativement l\'overhead de Zone.js.',
        difficulty: 'EXPERT'
    },
    {
        id: 5,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment créer un signal en Angular 19 ?',
        options: ['new Signal(value)', 'signal(value)', 'createSignal(value)', 'Signal.create(value)'],
        correctAnswer: 1,
        explanation: 'Les signals en Angular 19 se créent avec la fonction signal(). Exemple: const count = signal(0). Les signals sont une primitive réactive qui remplace progressivement RxJS pour la gestion d\'état locale et offrent une meilleure performance et une API plus simple.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 6,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle directive Angular permet d\'afficher conditionnellement un élément ?',
        options: ['*ngFor', '*ngIf', '*ngSwitch', '*ngModel'],
        correctAnswer: 1,
        explanation: '*ngIf est une directive structurelle qui ajoute ou supprime conditionnellement un élément du DOM. Syntaxe: <div *ngIf="condition">Content</div>. Important: elle supprime complètement l\'élément du DOM contrairement à [hidden] qui le cache seulement.',
        difficulty: 'NOVICE'
    },
    {
        id: 7,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment injecter un service dans un composant Angular 19 avec les nouveaux patterns ?',
        options: ['Via @Component metadata', 'Dans le constructor ou avec inject()', 'Avec @Injectable uniquement', 'Via les imports'],
        correctAnswer: 1,
        explanation: 'Angular 19 propose deux méthodes: traditionnelle via constructor(private service: MyService) ou moderne avec inject(): private service = inject(MyService). La fonction inject() est plus flexible et fonctionne dans tous les contextes d\'injection.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 8,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle est la nouvelle syntaxe de contrôle de flux d\'Angular 19 pour les conditions ?',
        options: ['*ngIf="condition"', '@if (condition) {}', '#if (condition)', 'v-if="condition"'],
        correctAnswer: 1,
        explanation: 'Angular 19 introduit une nouvelle syntaxe de contrôle de flux avec @if, @for, @switch. Exemple: @if (user.isAdmin) { <admin-panel/> } @else { <user-panel/> }. Cette syntaxe est plus lisible et performante que les directives structurelles.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 9,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment définir un input requis dans un composant Angular 19 ?',
        options: ['@Input() name!: string', '@Input({required: true}) name!: string', '@Input() @Required name: string', 'input.required<string>()'],
        correctAnswer: 3,
        explanation: 'Angular 19 introduit les signal-based inputs avec input.required<T>(). Exemple: name = input.required<string>(). Cette approche avec signals offre une meilleure type-safety et performance comparée aux décorateurs @Input traditionnels.',
        difficulty: 'EXPERT'
    },
    {
        id: 10,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle méthode utilise Angular 19 pour la gestion d\'état locale réactive ?',
        options: ['BehaviorSubject', 'Signals', 'NgRx Store', 'Services avec getters'],
        correctAnswer: 1,
        explanation: 'Les Signals sont la nouvelle approche recommandée pour la gestion d\'état réactive en Angular 19. Ils offrent une alternative plus simple et performante à RxJS pour l\'état local, avec une API intuitive et une meilleure intégration avec le système de détection des changements.',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 1 - Questions MySQL & BDD
    {
        id: 11,
        bloc: 'BLOC_1',
        category: 'MYSQL',
        question: 'Quelle requête SQL optimise les performances pour les recherches fréquentes ?',
        options: ['CREATE INDEX', 'ALTER TABLE', 'OPTIMIZE TABLE', 'ANALYZE TABLE'],
        correctAnswer: 0,
        explanation: 'CREATE INDEX crée un index sur une ou plusieurs colonnes. Les index accélèrent les requêtes SELECT, WHERE, JOIN et ORDER BY en créant une structure de données ordonnée. Attention: ils ralentissent les opérations INSERT/UPDATE/DELETE car l\'index doit être maintenu.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 12,
        bloc: 'BLOC_1',
        category: 'MYSQL',
        question: 'Quelle est la différence entre INNER JOIN et LEFT JOIN ?',
        options: ['Aucune différence', 'INNER JOIN retourne toutes les lignes, LEFT JOIN seulement les correspondances', 'LEFT JOIN retourne toutes les lignes de la table gauche, INNER JOIN seulement les correspondances', 'LEFT JOIN est plus rapide'],
        correctAnswer: 2,
        explanation: 'LEFT JOIN (ou LEFT OUTER JOIN) retourne toutes les lignes de la table de gauche même sans correspondance (avec NULL pour les colonnes de droite). INNER JOIN ne retourne que les lignes ayant une correspondance dans les deux tables. C\'est crucial pour éviter la perte de données.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 13,
        bloc: 'BLOC_1',
        category: 'JPA_HIBERNATE',
        question: 'Quelle annotation JPA définit une relation One-To-Many bidirectionnelle ?',
        options: ['@OneToOne', '@OneToMany + @JoinColumn', '@OneToMany + @ManyToOne', '@ManyToMany'],
        correctAnswer: 2,
        explanation: 'Une relation bidirectionnelle One-To-Many nécessite @OneToMany côté parent et @ManyToOne côté enfant. Le côté @ManyToOne est toujours le propriétaire de la relation. Utiliser mappedBy dans @OneToMany pour indiquer le champ propriétaire.',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 2 - Architecture et Conception
    {
        id: 14,
        bloc: 'BLOC_2',
        category: 'ARCHITECTURE',
        question: 'Quel pattern architectural sépare la logique métier de la présentation ?',
        options: ['MVC (Model-View-Controller)', 'Singleton', 'Observer', 'Factory'],
        correctAnswer: 0,
        explanation: 'MVC sépare l\'application en trois couches: Model (données/logique métier), View (présentation), Controller (gestion des interactions). Cette séparation améliore la maintenabilité, la testabilité et permet le développement parallèle des différentes couches.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 15,
        bloc: 'BLOC_2',
        category: 'CONCEPTION_BDD',
        question: 'Quelle forme normale élimine les dépendances transitives ?',
        options: ['1NF (Première forme normale)', '2NF (Deuxième forme normale)', '3NF (Troisième forme normale)', 'BCNF (Boyce-Codd)'],
        correctAnswer: 2,
        explanation: '3NF élimine les dépendances transitives (A→B et B→C donc A→C). Une table est en 3NF si elle est en 2NF et qu\'aucun attribut non-clé ne dépend transitivement de la clé primaire. Cela évite les anomalies de mise à jour et la redondance.',
        difficulty: 'EXPERT'
    },
    {
        id: 16,
        bloc: 'BLOC_2',
        category: 'UML',
        question: 'Quel diagramme UML modélise les interactions temporelles entre objets ?',
        options: ['Diagramme de classes', 'Diagramme de séquence', 'Diagramme de cas d\'usage', 'Diagramme d\'activité'],
        correctAnswer: 1,
        explanation: 'Le diagramme de séquence représente les interactions entre objets dans un ordre chronologique. Il montre les messages échangés, leur séquence temporelle, et les lignes de vie des objets. Essentiel pour modéliser les scénarios d\'utilisation complexes.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 17,
        bloc: 'BLOC_2',
        category: 'DESIGN_PATTERNS',
        question: 'Quel pattern assure qu\'une classe n\'a qu\'une seule instance ?',
        options: ['Factory', 'Singleton', 'Observer', 'Builder'],
        correctAnswer: 1,
        explanation: 'Le pattern Singleton garantit qu\'une classe n\'a qu\'une seule instance et fournit un point d\'accès global. Implémentation: constructeur privé, méthode statique getInstance(), instance statique. Attention aux problèmes de concurrence et de testabilité.',
        difficulty: 'NOVICE'
    },

    // BLOC 1 - Suite Angular 19
    {
        id: 18,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment créer un computed signal en Angular 19 ?',
        options: ['computed(() => expression)', 'signal.computed(expression)', 'createComputed(expression)', 'new ComputedSignal(expression)'],
        correctAnswer: 0,
        explanation: 'Les computed signals se créent avec computed(() => expression). Ils se recalculent automatiquement quand leurs dépendances changent. Exemple: fullName = computed(() => firstName() + " " + lastName()). Plus efficaces que les getters car mémorisés.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 19,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle est la nouvelle syntaxe pour les boucles en Angular 19 ?',
        options: ['*ngFor="let item of items"', '@for (item of items; track item.id) {}', '#each item in items', 'v-for="item in items"'],
        correctAnswer: 1,
        explanation: 'La nouvelle syntaxe @for remplace *ngFor: @for (item of items; track item.id) { <div>{{item.name}}</div> }. Le track est obligatoire pour les performances. Cette syntaxe est plus lisible et offre de meilleures optimisations.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 20,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment définir un output avec les nouveaux signal-based outputs ?',
        options: ['@Output() event = new EventEmitter()', 'output<T>()', '@Output() signal<T>()', 'createOutput<T>()'],
        correctAnswer: 1,
        explanation: 'Les signal-based outputs utilisent output<T>(). Exemple: clicked = output<MouseEvent>(). Pour émettre: this.clicked.emit(event). Cette approche est plus type-safe et cohérente avec les signal-based inputs.',
        difficulty: 'EXPERT'
    },

    // BLOC 1 - Spring Boot avancé
    {
        id: 21,
        bloc: 'BLOC_1',
        category: 'SPRING_BOOT',
        question: 'Quelle annotation démarre une application Spring Boot ?',
        options: ['@SpringApplication', '@SpringBootApplication', '@EnableAutoConfiguration', '@ComponentScan'],
        correctAnswer: 1,
        explanation: '@SpringBootApplication est une annotation composite qui combine @Configuration, @EnableAutoConfiguration et @ComponentScan. Elle active la configuration automatique, le scan des composants et marque la classe comme source de configuration.',
        difficulty: 'NOVICE'
    },
    {
        id: 22,
        bloc: 'BLOC_1',
        category: 'SPRING_BOOT',
        question: 'Comment configurer plusieurs profils dans application.yml ?',
        options: ['Utiliser des fichiers séparés', 'Sections spring.profiles', 'Document separator ---', 'Toutes les réponses'],
        correctAnswer: 3,
        explanation: 'Spring Boot offre plusieurs options: fichiers séparés (application-dev.yml), sections avec spring.config.activate.on-profile, ou séparateur de documents --- dans un même fichier. Chaque approche a ses avantages selon le contexte.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 23,
        bloc: 'BLOC_1',
        category: 'SPRING_DATA',
        question: 'Comment créer une requête personnalisée avec Spring Data JPA ?',
        options: ['@Query annotation', 'Query methods', 'Criteria API', 'Toutes les réponses'],
        correctAnswer: 3,
        explanation: 'Spring Data JPA offre plusieurs approches: @Query avec JPQL/SQL natif, query methods (findByName), Criteria API pour requêtes dynamiques, et Specifications pour des requêtes complexes réutilisables.',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 3 - Déploiement et DevOps
    {
        id: 24,
        bloc: 'BLOC_3',
        category: 'DOCKER',
        question: 'Quel outil permet de containeriser une application Java ?',
        options: ['Maven', 'Docker', 'Jenkins', 'Gradle'],
        correctAnswer: 1,
        explanation: 'Docker permet de créer des conteneurs légers et portables. Pour Java: utiliser une image base OpenJDK, copier le JAR, exposer le port, définir la commande de démarrage. Les conteneurs garantissent la cohérence entre développement, test et production.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 25,
        bloc: 'BLOC_3',
        category: 'CI_CD',
        question: 'Quelle est la différence entre Intégration Continue et Déploiement Continu ?',
        options: ['Aucune différence', 'CI = tests automatiques, CD = déploiement automatique', 'CI = compilation, CD = tests', 'CD inclut CI'],
        correctAnswer: 1,
        explanation: 'CI (Continuous Integration) automatise la compilation, les tests et l\'intégration du code. CD (Continuous Deployment) va plus loin en automatisant le déploiement en production après validation. CD nécessite une CI mature et des tests robustes.',
        difficulty: 'INTERMEDIATE'
    },

    // Questions Python
    {
        id: 26,
        bloc: 'BLOC_1',
        category: 'PYTHON',
        question: 'Quelle est la différence entre une liste et un tuple en Python ?',
        options: ['Aucune différence', 'Les listes sont mutables, les tuples immutables', 'Les tuples sont plus rapides', 'Les listes peuvent contenir différents types'],
        correctAnswer: 1,
        explanation: 'Les listes ([]) sont mutables (modifiables après création), les tuples (()) sont immutables. Les tuples sont plus rapides et utilisent moins de mémoire, peuvent servir de clés de dictionnaire, et garantissent l\'intégrité des données.',
        difficulty: 'NOVICE'
    },
    {
        id: 27,
        bloc: 'BLOC_1',
        category: 'PYTHON',
        question: 'Comment gérer les exceptions en Python ?',
        options: ['try/catch', 'try/except', 'catch/finally', 'handle/except'],
        correctAnswer: 1,
        explanation: 'Python utilise try/except/else/finally. try contient le code à risque, except capture les exceptions spécifiques, else s\'exécute si aucune exception, finally s\'exécute toujours. Toujours capturer des exceptions spécifiques plutôt que Exception générale.',
        difficulty: 'NOVICE'
    },

    // BLOC 2 - Architecture avancée
    {
        id: 28,
        bloc: 'BLOC_2',
        category: 'MICROSERVICES',
        question: 'Quel pattern résout la communication entre microservices ?',
        options: ['API Gateway', 'Database per service', 'Circuit Breaker', 'Event Sourcing'],
        correctAnswer: 0,
        explanation: 'L\'API Gateway centralise les appels clients vers les microservices. Il gère l\'authentification, le routage, la limitation de débit, et l\'agrégation de réponses. Cela simplifie le côté client et permet des préoccupations transversales centralisées.',
        difficulty: 'EXPERT'
    },
    {
        id: 29,
        bloc: 'BLOC_2',
        category: 'ARCHITECTURE',
        question: 'Qu\'est-ce que l\'architecture hexagonale (Ports and Adapters) ?',
        options: ['Architecture avec 6 couches', 'Isolation du métier des détails techniques', 'Pattern de communication', 'Architecture distribuée'],
        correctAnswer: 1,
        explanation: 'L\'architecture hexagonale isole la logique métier (domaine) des détails techniques via des ports (interfaces) et adapters (implémentations). Cela permet la testabilité, la maintenabilité et l\'indépendance technologique.',
        difficulty: 'EXPERT'
    },

    // Suite Angular 19 - Tests
    {
        id: 30,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment tester un signal en Angular 19 ?',
        options: ['TestBed.createComponent', 'signal() puis assert sur la valeur', 'MockSignal', 'Les signals ne se testent pas'],
        correctAnswer: 1,
        explanation: 'Les signals se testent simplement: créer le signal, modifier sa valeur avec set() ou update(), puis vérifier avec expect(signal()).toBe(value). Plus simple que les tests de composants avec détection de changements.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 31,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Quelle est la méthode recommandée pour l\'injection de dépendances en Angular 19 ?',
        options: ['Constructor injection uniquement', 'inject() function', 'Les deux sont équivalentes', '@Inject decorator'],
        correctAnswer: 1,
        explanation: 'La fonction inject() est maintenant recommandée car elle fonctionne dans plus de contextes (constructors, factory functions, field initializers) et offre une syntaxe plus flexible que l\'injection par constructeur traditionnelle.',
        difficulty: 'INTERMEDIATE'
    },

    // Questions sécurité
    {
        id: 32,
        bloc: 'BLOC_1',
        category: 'SECURITE',
        question: 'Qu\'est-ce qu\'une attaque XSS et comment s\'en protéger ?',
        options: ['Cross-Site Scripting, sanitiser les entrées', 'XML Security Scanner, utiliser HTTPS', 'Cross-Server Synchronization, authentification', 'eXtended SQL Security, prepared statements'],
        correctAnswer: 0,
        explanation: 'XSS (Cross-Site Scripting) injecte du code malveillant dans des pages web. Protection: sanitisation des entrées, échappement des sorties, Content Security Policy (CSP), validation côté serveur. Angular échappe automatiquement les templates.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 33,
        bloc: 'BLOC_1',
        category: 'SECURITE',
        question: 'Comment Spring Security gère-t-il l\'autorisation ?',
        options: ['Rôles uniquement', 'Permissions uniquement', 'Rôles et permissions avec expressions', 'Pas de gestion d\'autorisation'],
        correctAnswer: 2,
        explanation: 'Spring Security utilise les rôles (ROLE_USER) et permissions avec des expressions SpEL: @PreAuthorize("hasRole(\'ADMIN\')"), @PreAuthorize("hasAuthority(\'READ_PRIVILEGES\')"). Permet une autorisation fine basée sur méthodes ou URLs.',
        difficulty: 'INTERMEDIATE'
    },

    // MySQL avancé
    {
        id: 34,
        bloc: 'BLOC_1',
        category: 'MYSQL',
        question: 'Quelle clause SQL permet de limiter le nombre de résultats ?',
        options: ['TOP', 'LIMIT', 'MAX', 'COUNT'],
        correctAnswer: 1,
        explanation: 'LIMIT restreint le nombre de lignes retournées. Syntaxe: SELECT * FROM table LIMIT 10 OFFSET 20 (MySQL). Utilisé pour la pagination. Attention: OFFSET peut être lent sur de gros datasets, préférer la pagination par curseur.',
        difficulty: 'NOVICE'
    },
    {
        id: 35,
        bloc: 'BLOC_1',
        category: 'MYSQL',
        question: 'Quelle est la différence entre UNION et UNION ALL ?',
        options: ['Aucune différence', 'UNION élimine les doublons, UNION ALL les conserve', 'UNION ALL est plus lent', 'UNION fait une jointure'],
        correctAnswer: 1,
        explanation: 'UNION élimine automatiquement les doublons (coûteux), UNION ALL conserve tous les résultats (plus rapide). Utilisez UNION ALL si vous êtes sûr qu\'il n\'y a pas de doublons ou si vous les voulez.',
        difficulty: 'INTERMEDIATE'
    },

    // Questions d'architecture de données
    {
        id: 36,
        bloc: 'BLOC_2',
        category: 'CONCEPTION_BDD',
        question: 'Qu\'est-ce qu\'un index clustered vs non-clustered ?',
        options: ['Ils sont identiques', 'Clustered réorganise physiquement les données', 'Non-clustered est plus rapide', 'Clustered est pour MySQL uniquement'],
        correctAnswer: 1,
        explanation: 'Un index clustered réorganise physiquement les données selon l\'ordre de l\'index (généralement la clé primaire). Un non-clustered est une structure séparée pointant vers les données. Une table ne peut avoir qu\'un seul index clustered.',
        difficulty: 'EXPERT'
    },

    // Tests et qualité
    {
        id: 37,
        bloc: 'BLOC_1',
        category: 'TESTS',
        question: 'Quelle est la différence entre un test unitaire et un test d\'intégration ?',
        options: ['Aucune différence', 'Unitaire teste un composant isolé, intégration teste les interactions', 'Intégration est plus rapide', 'Unitaire teste l\'UI'],
        correctAnswer: 1,
        explanation: 'Les tests unitaires testent des composants isolés avec des mocks/stubs. Les tests d\'intégration testent les interactions entre composants réels. Pyramide des tests: nombreux tests unitaires, quelques tests d\'intégration, peu de tests E2E.',
        difficulty: 'INTERMEDIATE'
    },

    // Java avancé
    {
        id: 38,
        bloc: 'BLOC_1',
        category: 'JAVA',
        question: 'Qu\'est-ce que l\'inversion de contrôle (IoC) ?',
        options: ['Contrôler les exceptions', 'Le framework gère la création des objets', 'Inverser les conditions', 'Contrôler les imports'],
        correctAnswer: 1,
        explanation: 'IoC transfère le contrôle de création et gestion des objets au framework (container IoC). Au lieu de créer ses dépendances, un objet les reçoit. Cela améliore la testabilité, la flexibilité et le découplage.',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 39,
        bloc: 'BLOC_1',
        category: 'JAVA',
        question: 'Quelle est la différence entre == et equals() en Java ?',
        options: ['Aucune différence', '== compare les références, equals() le contenu', 'equals() est plus rapide', '== fonctionne seulement avec les primitives'],
        correctAnswer: 1,
        explanation: '== compare les références d\'objets (même adresse mémoire). equals() compare le contenu logique si redéfinie. Pour les String, utilisez toujours equals(). Attention: String literals partagent la même référence (pool).',
        difficulty: 'NOVICE'
    },

    // Angular 19 - Lazy Loading
    {
        id: 40,
        bloc: 'BLOC_1',
        category: 'ANGULAR_19',
        question: 'Comment implémenter le lazy loading avec les standalone components en Angular 19 ?',
        options: ['loadChildren avec modules', 'loadComponent avec import dynamique', 'import statique', 'Pas possible avec standalone'],
        correctAnswer: 1,
        explanation: 'Avec les standalone components: { path: "feature", loadComponent: () => import("./feature.component").then(c => c.FeatureComponent) }. Plus simple que les modules, chargement à la demande améliore les performances initiales.',
        difficulty: 'EXPERT'
    },

    // BLOC 3 - Monitoring et observabilité
    {
        id: 41,
        bloc: 'BLOC_3',
        category: 'MONITORING',
        question: 'Qu\'est-ce que l\'observabilité en développement ?',
        options: ['Observer le code', 'Logs + Metrics + Traces', 'Tests automatisés', 'Code review'],
        correctAnswer: 1,
        explanation: 'L\'observabilité combine 3 piliers: Logs (événements), Metrics (mesures quantitatives), Traces (suivi des requêtes). Permet de comprendre l\'état interne d\'un système à partir de ses sorties externes.',
        difficulty: 'EXPERT'
    },

    // Performance
    {
        id: 42,
        bloc: 'BLOC_1',
        category: 'PERFORMANCE',
        question: 'Quelle stratégie améliore les performances d\'une API REST ?',
        options: ['Augmenter la RAM', 'Cache, pagination, compression', 'Plus de serveurs uniquement', 'Réduire les fonctionnalités'],
        correctAnswer: 1,
        explanation: 'Optimisations API: Cache (Redis/Memcached), pagination (éviter de charger toutes les données), compression (gzip), index BDD, lazy loading, et limitation du nombre de requêtes (rate limiting).',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 2 - Patterns avancés
    {
        id: 43,
        bloc: 'BLOC_2',
        category: 'DESIGN_PATTERNS',
        question: 'Quel pattern permet de créer des objets sans spécifier leur classe exacte ?',
        options: ['Singleton', 'Factory', 'Observer', 'Adapter'],
        correctAnswer: 1,
        explanation: 'Le pattern Factory crée des objets sans exposer la logique de création. Factory Method utilise une méthode virtuelle, Abstract Factory crée des familles d\'objets. Utile pour l\'extensibilité et le découplage.',
        difficulty: 'INTERMEDIATE'
    },

    // Sécurité avancée
    {
        id: 44,
        bloc: 'BLOC_1',
        category: 'SECURITE',
        question: 'Qu\'est-ce que CORS et comment le configurer dans Spring Boot ?',
        options: ['Cross-Origin Request Security, @CrossOrigin', 'Core Object Request System, configuration XML', 'Cross-Origin Resource Sharing, @CrossOrigin ou WebMvcConfigurer', 'Certificate Origin Resource Security, HTTPS'],
        correctAnswer: 2,
        explanation: 'CORS (Cross-Origin Resource Sharing) permet aux navigateurs d\'effectuer des requêtes cross-domain. Spring Boot: @CrossOrigin sur contrôleurs/méthodes ou configuration globale via WebMvcConfigurer.addCorsMappings().',
        difficulty: 'INTERMEDIATE'
    },

    // Python avancé
    {
        id: 45,
        bloc: 'BLOC_1',
        category: 'PYTHON',
        question: 'Qu\'est-ce qu\'un décorateur en Python ?',
        options: ['Un commentaire de code', 'Une fonction qui modifie une autre fonction', 'Un type de variable', 'Une classe spéciale'],
        correctAnswer: 1,
        explanation: 'Un décorateur est une fonction qui prend une fonction en paramètre et retourne une fonction modifiée. Syntaxe @decorator. Utilisé pour ajouter des fonctionnalités (logging, timing, authentification) sans modifier le code original.',
        difficulty: 'INTERMEDIATE'
    },

    // BLOC 3 - Déploiement cloud
    {
        id: 46,
        bloc: 'BLOC_3',
        category: 'CLOUD',
        question: 'Qu\'est-ce que l\'Infrastructure as Code (IaC) ?',
        options: ['Coder dans le cloud', 'Gérer l\'infrastructure via du code', 'Infrastructure dans le code source', 'Code hébergé sur infrastructure'],
        correctAnswer: 1,
        explanation: 'IaC gère et provisionne l\'infrastructure via du code (Terraform, CloudFormation, Ansible). Avantages: versioning, reproductibilité, automation, documentation. L\'infrastructure devient prévisible et gérable comme du code.',
        difficulty: 'EXPERT'
    },

    // Git et versioning
    {
        id: 47,
        bloc: 'BLOC_3',
        category: 'GIT',
        question: 'Quelle est la différence entre git merge et git rebase ?',
        options: ['Aucune différence', 'Merge conserve l\'historique, rebase le réécrit', 'Rebase est plus sûr', 'Merge est pour les branches locales'],
        correctAnswer: 1,
        explanation: 'Git merge conserve l\'historique des branches avec un commit de merge. Git rebase réécrit l\'historique en appliquant les commits sur la branche cible. Rebase donne un historique linéaire mais ne jamais rebaser des commits publics.',
        difficulty: 'INTERMEDIATE'
    },

    // Angular 19 - SSR
    {
        id: 48,
        bloc: 'BLOC_3',
        category: 'ANGULAR_19',
        question: 'Comment Angular 19 améliore-t-il le Server-Side Rendering ?',
        options: ['SSR non supporté', 'SSR + Hydration partielle', 'SSR uniquement', 'Pas de changement'],
        correctAnswer: 1,
        explanation: 'Angular 19 améliore SSR avec l\'hydration partielle (partial hydration) et les techniques de streaming. Permet de hydrater seulement les parties interactives de la page, améliorant significativement les performances et l\'expérience utilisateur.',
        difficulty: 'EXPERT'
    },

    // API Design
    {
        id: 49,
        bloc: 'BLOC_2',
        category: 'API_DESIGN',
        question: 'Quels sont les principes d\'une API REST bien conçue ?',
        options: ['GET seulement', 'Stateless, ressources identifiées par URI, méthodes HTTP standards', 'POST pour tout', 'Session-based'],
        correctAnswer: 1,
        explanation: 'Principes REST: Stateless (sans état), ressources identifiées par URI, utilisation des méthodes HTTP (GET, POST, PUT, DELETE), représentations multiples (JSON, XML), HATEOAS optionnel. Cache et interface uniforme.',
        difficulty: 'INTERMEDIATE'
    },

    // Question finale - Intégration
    {
        id: 50,
        bloc: 'BLOC_2',
        category: 'INTEGRATION',
        question: 'Dans une architecture Angular 19 + Spring Boot, comment optimiser les échanges de données ?',
        options: ['Polling constant', 'WebSockets + JSON optimisé + Cache', 'Requêtes synchrones uniquement', 'Base de données partagée'],
        correctAnswer: 1,
        explanation: 'Optimisations: WebSockets pour temps réel, JSON optimisé (DTOs), cache côté client (interceptors), lazy loading, pagination, compression gzip, et CDN pour les assets statiques. Architecture découplée avec API Gateway.',
        difficulty: 'EXPERT'
    }
];

// Constantes pour le quiz
const QUESTIONS_PER_QUIZ = 15;

export default function CDAQuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);

    const question = selectedQuestions[currentQuestion];

    // Fonction pour sélectionner 15 questions aléatoires
    const selectRandomQuestions = () => {
        const shuffled = [...CDA_QUIZ_DATA].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, QUESTIONS_PER_QUIZ);
    };

    // Initialiser avec 15 questions aléatoires
    useEffect(() => {
        const randomQuestions = selectRandomQuestions();
        setSelectedQuestions(randomQuestions);
    }, []);

    useEffect(() => {
        if (!quizCompleted && selectedQuestions.length > 0) {
            const timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [quizCompleted, selectedQuestions.length]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answerIndex);
        setShowExplanation(true);
        setQuestionsAnswered(prev => prev + 1);

        if (answerIndex === question.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < selectedQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        const newRandomQuestions = selectRandomQuestions();
        setSelectedQuestions(newRandomQuestions);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuestionsAnswered(0);
        setQuizCompleted(false);
        setTimeElapsed(0);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch(difficulty) {
            case 'NOVICE': return NierTheme.colors.accent;
            case 'INTERMEDIATE': return '#FF9800';
            case 'EXPERT': return '#F44336';
            default: return NierTheme.colors.textMuted;
        }
    };

    // Affichage de chargement si questions pas encore sélectionnées
    if (selectedQuestions.length === 0) {
        return (
            <SafeAreaView style={NierStyles.container}>
                <ThemedView style={[GlobalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ThemedText type="title">[INITIALIZING_EXAM_SIMULATION...]</ThemedText>
                    <ThemedText type="muted" style={{ marginTop: 10 }}>
                        Sélection de {QUESTIONS_PER_QUIZ} questions parmi {CDA_QUIZ_DATA.length}
                    </ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    if (quizCompleted) {
        const percentage = Math.round((score / selectedQuestions.length) * 100);
        const getGrade = () => {
            if (percentage >= 90) return 'ANDROID_LEVEL_A+';
            if (percentage >= 80) return 'ANDROID_LEVEL_A';
            if (percentage >= 70) return 'ANDROID_LEVEL_B+';
            if (percentage >= 60) return 'ANDROID_LEVEL_B';
            return 'REBOOT_REQUIRED';
        };

        const getPerformanceAnalysis = () => {
            const timePerQuestion = timeElapsed / selectedQuestions.length;
            const avgTime = timePerQuestion < 30 ? 'RAPID' : timePerQuestion < 60 ? 'OPTIMAL' : 'DETAILED';
            return avgTime;
        };

        return (
            <SafeAreaView style={NierStyles.container}>
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <ThemedView variant="card" style={GlobalStyles.card}>
                        <ThemedText type="title" style={[GlobalStyles.centerText, { marginBottom: 20 }]}>
                            [MISSION_COMPLETE]
                        </ThemedText>

                        <ThemedText type="system" style={GlobalStyles.statusText}>
                            [EVALUATION_RESULTS]{'\n'}
                            ├── Score: {score}/{selectedQuestions.length}{'\n'}
                            ├── Pourcentage: {percentage}%{'\n'}
                            ├── Temps total: {formatTime(timeElapsed)}{'\n'}
                            ├── Temps/question: {Math.round(timeElapsed/selectedQuestions.length)}s{'\n'}
                            ├── Rythme: {getPerformanceAnalysis()}{'\n'}
                            ├── Grade: {getGrade()}{'\n'}
                            ├── Questions utilisées: {selectedQuestions.length}/{CDA_QUIZ_DATA.length}{'\n'}
                            └── Status: {percentage >= 60 ? 'CDA_CERTIFIED' : 'RETRY_REQUIRED'}
                        </ThemedText>

                        {percentage >= 60 && (
                            <ThemedText style={[GlobalStyles.statusText, { color: NierTheme.colors.accent, marginTop: 15 }]}>
                                [CERTIFICATION_UNLOCKED]{'\n'}
                                Concepteur Développeur d'Applications{'\n'}
                                Niveau: {getGrade()}
                            </ThemedText>
                        )}

                        <Pressable
                            style={[NierStyles.button, { marginTop: 20 }]}
                            onPress={resetQuiz}
                        >
                            <ThemedText style={NierStyles.buttonText}>
                                [NEW_RANDOM_QUIZ]
                            </ThemedText>
                        </Pressable>
                    </ThemedView>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={NierStyles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Header avec progression */}
                <ThemedView variant="elevated" style={GlobalStyles.headerCard}>
                    <ThemedText type="system" style={GlobalStyles.systemInfo}>
                        [CDA_EXAM_SIMULATION_V2.0]{'\n'}
                        [BLOC] {question.bloc} - {question.category}{'\n'}
                        [PROGRESS] {currentQuestion + 1}/{selectedQuestions.length}{'\n'}
                        [POOL] {selectedQuestions.length}/{CDA_QUIZ_DATA.length} questions{'\n'}
                        [TIME] {formatTime(timeElapsed)}{'\n'}
                        [SCORE] {score}/{questionsAnswered}
                    </ThemedText>
                </ThemedView>

                {/* Question */}
                <ThemedView variant="card" style={[GlobalStyles.card, { marginTop: 20 }]}>
                    <ThemedText
                        type="muted"
                        style={[
                            GlobalStyles.timestamp,
                            { color: getDifficultyColor(question.difficulty) }
                        ]}
                    >
                        [DIFFICULTY: {question.difficulty}] - QUESTION_{question.id.toString().padStart(3, '0')}
                    </ThemedText>

                    <ThemedText type="subtitle" style={{ marginVertical: 15, lineHeight: 24 }}>
                        {question.question}
                    </ThemedText>

                    {/* Options */}
                    {question.options.map((option, index) => {
                        let buttonStyle = [
                            {
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: NierTheme.colors.border,
                                padding: 15,
                                marginVertical: 5,
                                borderRadius: 5,
                            }
                        ];
                        let textColor = NierTheme.colors.text;

                        if (selectedAnswer !== null) {
                            if (index === question.correctAnswer) {
                                buttonStyle.push({
                                    backgroundColor: '#4CAF50',
                                    borderColor: '#4CAF50'
                                });
                                textColor = '#FFFFFF';
                            } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                                buttonStyle.push({
                                    backgroundColor: '#F44336',
                                    borderColor: '#F44336'
                                });
                                textColor = '#FFFFFF';
                            } else {
                                buttonStyle.push({ opacity: 0.5 });
                            }
                        }

                        return (
                            <Pressable
                                key={index}
                                style={buttonStyle}
                                onPress={() => handleAnswerSelect(index)}
                                disabled={selectedAnswer !== null}
                            >
                                <ThemedText style={[NierStyles.buttonText, { color: textColor, textAlign: 'left' }]}>
                                    [{String.fromCharCode(65 + index)}] {option}
                                </ThemedText>
                            </Pressable>
                        );
                    })}

                    {/* Explication */}
                    {showExplanation && (
                        <ThemedView variant="surface" style={[GlobalStyles.statusCard, { marginTop: 15 }]}>
                            <ThemedText type="system" style={{ lineHeight: 20 }}>
                                [EXPLANATION]{'\n'}
                                {question.explanation}
                            </ThemedText>
                        </ThemedView>
                    )}

                    {/* Bouton suivant */}
                    {showExplanation && (
                        <Pressable
                            style={[NierStyles.button, { marginTop: 20 }]}
                            onPress={handleNextQuestion}
                        >
                            <ThemedText style={NierStyles.buttonText}>
                                {currentQuestion < selectedQuestions.length - 1 ? '[NEXT_QUESTION]' : '[COMPLETE_EXAM]'}
                            </ThemedText>
                        </Pressable>
                    )}
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}