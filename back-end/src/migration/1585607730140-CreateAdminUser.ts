import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User, UserRole } from "../entity/User";

export class CreateAdminUser1585607730140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let adminUser = new User();
    adminUser.username = "admin";
    adminUser.password = "admin";
    adminUser.hashPassword();
    adminUser.roles = [UserRole.ADMIN];
    adminUser.firstName = "Nathan"
    adminUser.lastName = "Rile"
    const userRepository = getRepository(User);
    let user = new User();
    user.username = "regular";
    user.password = "test";
    user.hashPassword();
    user.roles = [UserRole.USER];
    user.firstName = "Nathan"
    user.lastName = "Rile"
    await userRepository.save([user, adminUser]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    let user = await queryRunner.getTable("User");
    if(user)
        await queryRunner.dropTable(user!)
  }
}