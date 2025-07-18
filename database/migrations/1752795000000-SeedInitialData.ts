import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1752795000000 implements MigrationInterface {
    name = 'SeedInitialData1752795000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.seedUsers(queryRunner);
        await this.seedPsychologists(queryRunner);
        await this.seedTimeSlots(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM time_slots`);
        await queryRunner.query(`DELETE FROM users`);
        await queryRunner.query(`DELETE FROM psychologists`);
    }

    private async seedUsers(queryRunner: QueryRunner): Promise<void> {
        const users = [
            { id: 'db0667c4-4859-4ad1-9d8a-ea52651c78c7', name: 'Juan Pérez', email: 'juan.perez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: '51ba82db-3f05-4291-bc5e-c68169f7512a', name: 'María García', email: 'maria.garcia@email.com', phone: '+54 11 2345-6789', birth_date: '1985-08-22', notes: null, active: true },
            { id: '52d5faac-e043-4f73-b2b3-77c1cb4a1011', name: 'Carlos López', email: 'carlos.lopez@email.com', phone: '+54 11 3456-7890', birth_date: '1992-03-10', notes: null, active: true },
            { id: 'c84e4b65-39cd-4555-b90e-a199407064ff', name: 'Ana Rodríguez', email: 'ana.rodriguez@email.com', phone: '+54 11 4567-8901', birth_date: '1988-12-05', notes: null, active: true },
            { id: '0b79061a-efc9-4fb7-ba10-7d041a1bec91', name: 'Luis Martínez', email: 'luis.martinez@email.com', phone: '+54 11 5678-9012', birth_date: '1995-07-18', notes: null, active: true },
            { id: '0f420cd7-e42c-45f0-bff0-bd181b826334', name: 'Elena Sánchez', email: 'elena.sanchez@email.com', phone: '+54 11 6789-0123', birth_date: '1987-11-30', notes: null, active: true },
            { id: 'c6c94f53-6650-446f-ba2c-0664c214976a', name: 'Miguel Torres', email: 'miguel.torres@email.com', phone: '+54 11 7890-1234', birth_date: '1993-04-25', notes: null, active: true },
            { id: '2192993a-c8da-473e-94f5-f29742d1cfc6', name: 'Sofía Fernández', email: 'sofia.fernandez@email.com', phone: '+54 11 8901-2345', birth_date: '1991-09-12', notes: null, active: true },
            { id: '8f13ce0f-1867-4db5-a343-47afe4654f02', name: 'Juan Gomez', email: 'juan.gomez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: '37d2639f-d551-481d-9e88-bab54ba816d3', name: 'Pedro Gomez', email: 'pedro.gomez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: '80f9c74b-10c4-41f0-9ef9-792066cee65e', name: 'Santiago Gomez', email: 'santiago.gomez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: 'd280d832-e361-41da-be14-af7f9a33048b', name: 'Juan González', email: 'juan.gonzalez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: '648be939-dd74-4450-9b6e-a889510248d7', name: 'Pedro González', email: 'pedro.gonzalez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: '96fd82ff-83d5-4c1f-8c9d-88612b3eaa99', name: 'Juan Sanchéz', email: 'juan.sanchez@email.com', phone: '+54 11 1234-5678', birth_date: '1990-05-15', notes: null, active: true },
            { id: 'c4b55e9e-c2c4-49aa-a421-411cda49dc11', name: 'Micaela Scapino', email: 'micascapinomdq@gmail.com', phone: '', birth_date: null, notes: '', active: true }
        ];

        for (const user of users) {
            await queryRunner.query(`
                INSERT INTO users (id, name, email, phone, birth_date, notes, active)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [
                user.id,
                user.name,
                user.email,
                user.phone,
                user.birth_date,
                user.notes,
                user.active
            ]);
        }
    }

    private async seedPsychologists(queryRunner: QueryRunner): Promise<void> {
        const psychologists = [
            {
                id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a',
                name: 'Dra. María González',
                specializations: ['Ansiedad', 'Depresión', 'Estrés'],
                rating: 4.9,
                experience: 8,
                avatar: '/api/placeholder/120/120',
                bio: 'Especialista en terapia cognitivo-conductual con más de 8 años de experiencia. Me enfoco en ayudar a las personas a superar la ansiedad y depresión.',
                price_per_session: 15000,
                languages: ['Español', 'Inglés'],
                education: ['Psicología Clínica - Universidad de Barcelona', 'Máster en Terapia Cognitivo-Conductual']
            },
            {
                id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405',
                name: 'Dr. Carlos Rodríguez',
                specializations: ['Terapia de pareja', 'Terapia familiar', 'Desarrollo personal'],
                rating: 4.8,
                experience: 12,
                avatar: '/api/placeholder/120/120',
                bio: 'Terapeuta familiar y de pareja con enfoque sistémico. Ayudo a mejorar las relaciones interpersonales y el crecimiento personal.',
                price_per_session: 18000,
                languages: ['Español', 'Catalán'],
                education: ['Psicología Clínica - Universidad Autónoma de Madrid', 'Especialización en Terapia Sistémica']
            },
            {
                id: '2db453fc-e89d-4252-b0df-dc0751edaf94',
                name: 'Dra. Ana Martínez',
                specializations: ['Fobias', 'Trastornos alimentarios', 'Autoestima'],
                rating: 4.7,
                experience: 6,
                avatar: '/api/placeholder/120/120',
                bio: 'Especialista en fobias y trastornos alimentarios. Utilizo técnicas de exposición y terapia cognitivo-conductual.',
                price_per_session: 14000,
                languages: ['Español', 'Francés'],
                education: ['Psicología Clínica - Universidad de Valencia', 'Máster en Trastornos Alimentarios']
            },
            {
                id: '191f8d7d-e6fe-4d96-b4e5-64e181a69c58',
                name: 'Dr. Luis Fernández',
                specializations: ['Duelo', 'Depresión', 'Mindfulness'],
                rating: 4.9,
                experience: 15,
                avatar: '/api/placeholder/120/120',
                bio: 'Terapeuta con amplia experiencia en procesos de duelo y depresión. Integro mindfulness en mis tratamientos.',
                price_per_session: 20000,
                languages: ['Español', 'Inglés', 'Alemán'],
                education: ['Psicología Clínica - Universidad Complutense de Madrid', 'Certificación en Mindfulness']
            },
            {
                id: '82247a8a-4928-4c5b-97e2-00414e34adda',
                name: 'Dra. Elena Sánchez',
                specializations: ['Estrés', 'Autoestima', 'Desarrollo personal'],
                rating: 4.6,
                experience: 10,
                avatar: '/api/placeholder/120/120',
                bio: 'Psicóloga especializada en gestión del estrés y desarrollo personal. Enfoque humanista y técnicas de relajación.',
                price_per_session: 16000,
                languages: ['Español', 'Inglés'],
                education: ['Psicología Clínica - Universidad de Sevilla', 'Máster en Psicología Humanista']
            },
            {
                id: 'b6651bbf-f915-480a-ade4-64958a41b017',
                name: 'Dr. Miguel Torres',
                specializations: ['Terapia cognitivo-conductual', 'Ansiedad', 'Fobias'],
                rating: 4.8,
                experience: 7,
                avatar: '/api/placeholder/120/120',
                bio: 'Especialista en terapia cognitivo-conductual con enfoque en ansiedad y fobias específicas.',
                price_per_session: 15500,
                languages: ['Español', 'Portugués'],
                education: ['Psicología Clínica - Universidad de Granada', 'Especialización en TCC']
            }
        ];

        for (const psychologist of psychologists) {
            await queryRunner.query(`
                INSERT INTO psychologists (id, name, specializations, rating, experience, avatar, bio, price_per_session, languages, education)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `, [
                psychologist.id,
                psychologist.name,
                psychologist.specializations,
                psychologist.rating,
                psychologist.experience,
                psychologist.avatar,
                psychologist.bio,
                psychologist.price_per_session,
                psychologist.languages,
                psychologist.education
            ]);
        }
    }

    private async seedTimeSlots(queryRunner: QueryRunner): Promise<void> {
        const timeSlots = [
            { id: '13184c0e-7983-4f6b-a7a5-9f9aa3f46483', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 05:00:00.000', end_date: '2025-07-16 06:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'dad18cc6-8e28-4068-aff9-b9d50ac60b07', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: false, user_id: null, booking_notes: 'Primera consulta', start_date: '2025-07-16 06:00:00.000', end_date: '2025-07-16 07:00:00.000', virtual_session: true, clinic_session: true },
            { id: '91122702-a7b1-417c-acb9-5e2739a0a91c', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 06:00:00.000', end_date: '2025-07-16 07:00:00.000', virtual_session: true, clinic_session: false },
            { id: '519580bc-98ff-4872-acb0-bc2846346532', psychologist_id: '2db453fc-e89d-4252-b0df-dc0751edaf94', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 07:00:00.000', end_date: '2025-07-16 08:00:00.000', virtual_session: true, clinic_session: false },
            { id: '3dfc968c-1b6a-4586-874d-46e6a6067b3c', psychologist_id: '2db453fc-e89d-4252-b0df-dc0751edaf94', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 08:00:00.000', end_date: '2025-07-16 09:00:00.000', virtual_session: true, clinic_session: false },
            { id: '30ce9a44-e4df-4e98-9442-b8fc600d4f2d', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 08:00:00.000', end_date: '2025-07-16 09:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'b4ef3650-9a67-48a2-b1a0-9cdf08b16188', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 08:00:00.000', end_date: '2025-07-16 09:00:00.000', virtual_session: false, clinic_session: true },
            { id: '2fa85c0e-111b-49fc-953a-e35e13678f6d', psychologist_id: '2db453fc-e89d-4252-b0df-dc0751edaf94', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 09:00:00.000', end_date: '2025-07-16 10:00:00.000', virtual_session: false, clinic_session: true },
            { id: '7d0ca2f8-8096-42f6-9d08-240ab1ea06c8', psychologist_id: '2db453fc-e89d-4252-b0df-dc0751edaf94', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 10:00:00.000', end_date: '2025-07-16 11:00:00.000', virtual_session: false, clinic_session: true },
            { id: 'd1eebef0-8abf-43f1-83ba-ed79f52c0d0a', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 12:00:00.000', end_date: '2025-07-16 13:00:00.000', virtual_session: false, clinic_session: true },
            { id: '63d6ba45-7cab-4ce1-821f-276937b3ded5', psychologist_id: 'b6651bbf-f915-480a-ade4-64958a41b017', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 12:00:00.000', end_date: '2025-07-16 13:00:00.000', virtual_session: false, clinic_session: true },
            { id: '7c05f8b4-be40-436d-9045-fa9211523470', psychologist_id: '191f8d7d-e6fe-4d96-b4e5-64e181a69c58', available: true, user_id: null, booking_notes: null, start_date: '2025-07-16 13:00:00.000', end_date: '2025-07-16 14:00:00.000', virtual_session: true, clinic_session: true },
            { id: '39d18a7c-26bb-4b6c-9cc2-ff1930a66f6f', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 05:00:00.000', end_date: '2025-07-17 06:00:00.000', virtual_session: true, clinic_session: true },
            { id: '102e1231-33df-4956-92ff-2911a730d4bc', psychologist_id: '191f8d7d-e6fe-4d96-b4e5-64e181a69c58', available: false, user_id: '2192993a-c8da-473e-94f5-f29742d1cfc6', booking_notes: 'Terapia individual', start_date: '2025-07-17 05:00:00.000', end_date: '2025-07-17 06:00:00.000', virtual_session: false, clinic_session: true },
            { id: '912abd5a-95ab-47f8-bc8f-f251a17e3c24', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 06:00:00.000', end_date: '2025-07-17 07:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'e01f5bd7-666b-4ce6-9a85-d657228a86b6', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: false, user_id: 'db0667c4-4859-4ad1-9d8a-ea52651c78c7', booking_notes: 'Primera consulta - Ansiedad social', start_date: '2025-07-17 06:00:00.000', end_date: '2025-07-17 07:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'e032cf43-ae7b-4acf-8162-63f0b4a73f73', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: false, user_id: 'c4b55e9e-c2c4-49aa-a421-411cda49dc11', booking_notes: '', start_date: '2025-07-17 07:00:00.000', end_date: '2025-07-17 08:00:00.000', virtual_session: false, clinic_session: true },
            { id: '41b12dc1-547b-48cf-9836-9ce636f129da', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 08:00:00.000', end_date: '2025-07-17 09:00:00.000', virtual_session: true, clinic_session: true },
            { id: 'f91db18f-adf3-400e-b36b-ff3e0d183ef9', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 11:00:00.000', end_date: '2025-07-17 12:00:00.000', virtual_session: true, clinic_session: false },
            { id: '33dab97f-ee7f-49b3-9d41-f183075bcf7b', psychologist_id: 'b6651bbf-f915-480a-ade4-64958a41b017', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 11:00:00.000', end_date: '2025-07-17 12:00:00.000', virtual_session: false, clinic_session: true },
            { id: '731280dd-328d-4913-8afa-ece34887dab1', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 13:00:00.000', end_date: '2025-07-17 14:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'b6a16f23-0cf9-424f-9cc9-307497a2a733', psychologist_id: '82247a8a-4928-4c5b-97e2-00414e34adda', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 13:00:00.000', end_date: '2025-07-17 14:00:00.000', virtual_session: true, clinic_session: true },
            { id: 'd770c070-8310-47e7-9c0b-7cc9ed3e93f3', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: true, user_id: null, booking_notes: null, start_date: '2025-07-17 14:00:00.000', end_date: '2025-07-17 15:00:00.000', virtual_session: true, clinic_session: true },
            { id: '63b9f8d6-bd7e-4bfa-bb66-4bd06dd53062', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: false, user_id: null, booking_notes: 'Seguimiento', start_date: '2025-07-18 06:00:00.000', end_date: '2025-07-18 07:00:00.000', virtual_session: false, clinic_session: true },
            { id: '6841bd61-982e-4cdb-aa77-d8258c068292', psychologist_id: 'd5ceab7c-a34b-4807-82db-492ee9b3f22a', available: false, user_id: null, booking_notes: null, start_date: '2025-07-18 07:00:00.000', end_date: '2025-07-18 08:00:00.000', virtual_session: false, clinic_session: true },
            { id: '3cd4bae4-4911-42de-babe-d9c5decdc04b', psychologist_id: '82247a8a-4928-4c5b-97e2-00414e34adda', available: true, user_id: null, booking_notes: null, start_date: '2025-07-18 07:00:00.000', end_date: '2025-07-18 08:00:00.000', virtual_session: true, clinic_session: false },
            { id: 'fe823821-9759-4c70-9560-b487d550cfbd', psychologist_id: 'a8ea9d0e-7840-4459-b35a-9e581b0f6405', available: false, user_id: '51ba82db-3f05-4291-bc5e-c68169f7512a', booking_notes: 'Seguimiento - Depresión', start_date: '2025-07-18 07:00:00.000', end_date: '2025-07-18 08:00:00.000', virtual_session: false, clinic_session: true },
            { id: '2a3dc5bc-6dea-426f-b4f5-ae14ba3d8fd7', psychologist_id: '191f8d7d-e6fe-4d96-b4e5-64e181a69c58', available: false, user_id: 'c4b55e9e-c2c4-49aa-a421-411cda49dc11', booking_notes: '', start_date: '2025-07-18 09:00:00.000', end_date: '2025-07-18 10:00:00.000', virtual_session: true, clinic_session: true }
        ];

        for (const slot of timeSlots) {
            await queryRunner.query(`
                INSERT INTO time_slots (id, psychologist_id, available, user_id, booking_notes, start_date, end_date, virtual_session, clinic_session)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `, [
                slot.id,
                slot.psychologist_id,
                slot.available,
                slot.user_id,
                slot.booking_notes,
                slot.start_date,
                slot.end_date,
                slot.virtual_session,
                slot.clinic_session
            ]);
        }
    }
} 