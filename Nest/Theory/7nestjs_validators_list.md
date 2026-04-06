# NestJS class-validator – Complete Validators List

## 📌 Introduction
This document contains a list of commonly used validators from class-validator used in NestJS DTOs.

---

## 🔤 String Validators

- @IsString() → value must be a string
- @IsNotEmpty() → should not be empty
- @IsEmpty() → must be empty
- @Length(min, max) → string length range
- @MinLength(n) → minimum length
- @MaxLength(n) → maximum length
- @Matches(regex) → must match pattern

---

## 📧 Email & Format Validators

- @IsEmail() → valid email format
- @IsUrl() → valid URL
- @IsUUID() → valid UUID
- @IsPhoneNumber(region) → valid phone number

---

## 🔢 Number Validators

- @IsNumber() → must be a number
- @IsInt() → must be integer
- @Min(n) → minimum value
- @Max(n) → maximum value
- @IsPositive() → > 0
- @IsNegative() → < 0

---

## 📅 Date Validators

- @IsDate() → must be Date object
- @IsDateString() → ISO date string

---

## 🔘 Boolean Validators

- @IsBoolean() → true/false only

---

## 📚 Array Validators

- @IsArray() → must be array
- @ArrayNotEmpty() → array should not be empty
- @ArrayMinSize(n) → minimum items
- @ArrayMaxSize(n) → maximum items
- @IsString({ each: true }) → validate each element

---

## 🔁 Optional & Conditional

- @IsOptional() → optional field
- @ValidateIf(condition) → conditional validation

---

## 🧱 Nested Validators

- @ValidateNested() → nested object validation
- @Type(() => Class) → required for nested DTO

---

## 🎯 Enum Validator

- @IsEnum(enum) → must match enum values

---

## 🔐 Advanced Validators

- @IsJSON()
- @IsBase64()
- @IsCreditCard()
- @IsIP()

---

## 🧠 Example

```ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

---

## 🚀 Summary

DTO + Validators = Clean, Safe API

---

Generated on: 2026-04-03 10:47:23.626221
