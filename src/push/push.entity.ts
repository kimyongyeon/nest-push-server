import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class AppDeviceTokenEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    tokenName: string;

    @Column()
    useYn: boolean;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;
}

@Entity() 
export class WebDomainEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    domainName: string;

    @Column()
    useYn: boolean;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;
}

@Entity() 
export class AppVersionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    appName: string;

    @Column({ length: 500 })
    version: string;

    @Column()
    useYn: boolean;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;
}

// export const BaseColumnSchemaPart = {
//     id: {
//         type: Number,
//         primary: true,
//         generated: true,
//     } as EntitySchemaColumnOptions,
//     useYn: {
//         type: Boolean
//     } as EntitySchemaColumnOptions,
//     createdAt: {
//         name: 'created_at',
//         type: 'timestamp with time zone',
//         createDate: true,
//     } as EntitySchemaColumnOptions,
//     updatedAt: {
//         name: 'updated_at',
//         type: 'timestamp with time zone',
//         updateDate: true,
//     } as EntitySchemaColumnOptions
// };

// @Entity()
// export const AppDeviceTokenEntity = new EntitySchema<AppDeviceToken>({
//     name: "appDeviceToken",
//     columns: {
//         ...BaseColumnSchemaPart,
//         tokenName: {
//             type: String
//         } as EntitySchemaColumnOptions
//     }
// });

// @Entity()
// export const WebDomainEntity = new EntitySchema<WebDomain>({
//     name: "webDomain",
//     columns: {
//         ...BaseColumnSchemaPart,
//         domainName: {
//             type: String
//         } as EntitySchemaColumnOptions
//     }
// });

// @Entity()
// export const AppVersionEntity = new EntitySchema<AppVersion>({
//     name: "appVersion",
//     columns: {
//         ...BaseColumnSchemaPart,
//         appName: {
//             type: String
//         } as EntitySchemaColumnOptions,
//         version: {
//             type: String
//         } as EntitySchemaColumnOptions
//     }
// });

